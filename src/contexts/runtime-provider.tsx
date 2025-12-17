import {
  AssistantRuntimeProvider,
  type unstable_RemoteThreadListAdapter as RemoteThreadListAdapter,
  RuntimeAdapterProvider,
  type ThreadHistoryAdapter,
  useAssistantApi,
  unstable_useRemoteThreadListRuntime as useRemoteThreadListRuntime
} from "@assistant-ui/react";
import { createAssistantStream } from "assistant-stream";
import { useMemo } from "react";

// Implement your custom adapter with proper message persistence
const myDatabaseAdapter: RemoteThreadListAdapter = {
  async list() {
    const threads = await db.threads.findAll();
    return {
      threads: threads.map((t) => ({
        status: t.archived ? "archived" : "regular",
        remoteId: t.id,
        title: t.title
      }))
    };
  },

  async initialize(threadId) {
    const thread = await db.threads.create({ id: threadId });
    return { remoteId: thread.id };
  },

  async rename(remoteId, newTitle) {
    await db.threads.update(remoteId, { title: newTitle });
  },

  async archive(remoteId) {
    await db.threads.update(remoteId, { archived: true });
  },

  async unarchive(remoteId) {
    await db.threads.update(remoteId, { archived: false });
  },

  async delete(remoteId) {
    // Delete thread and its messages
    await db.messages.deleteByThreadId(remoteId);
    await db.threads.delete(remoteId);
  },

  async generateTitle(remoteId, messages) {
    // Generate title from messages using your AI
    const newTitle = await generateTitle(messages);

    // Persist the title in your DB
    await db.threads.update(remoteId, { title: newTitle });

    // IMPORTANT: Return an AssistantStream so the UI updates
    return createAssistantStream((controller) => {
      controller.appendText(newTitle);
      controller.close();
    });
  }
};

// Complete implementation with message persistence using Provider pattern
export function MyRuntimeProvider({ children }) {
  const runtime = useRemoteThreadListRuntime({
    runtimeHook: () => {
      return useLocalRuntime(MyModelAdapter);
    },
    adapter: {
      ...myDatabaseAdapter,

      // The Provider component adds thread-specific adapters
      unstable_Provider: ({ children }) => {
        // This runs in the context of each thread
        const api = useAssistantApi();

        // Create thread-specific history adapter
        const history = useMemo<ThreadHistoryAdapter>(
          () => ({
            async load() {
              const { remoteId } = api.threadListItem().getState();
              if (!remoteId) return { messages: [] };

              const messages = await db.messages.findByThreadId(remoteId);
              return {
                messages: messages.map((m) => ({
                  role: m.role,
                  content: m.content,
                  id: m.id,
                  createdAt: new Date(m.createdAt)
                }))
              };
            },

            async append(message) {
              // Wait for initialization to get remoteId (safe to call multiple times)
              const { remoteId } = await api.threadListItem().initialize();

              await db.messages.create({
                threadId: remoteId,
                role: message.role,
                content: message.content,
                id: message.id,
                createdAt: message.createdAt
              });
            }
          }),
          [api]
        );

        const adapters = useMemo(() => ({ history }), [history]);

        return <RuntimeAdapterProvider adapters={adapters}>{children}</RuntimeAdapterProvider>;
      }
    }
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
