import { useAssistantApi } from "@assistant-ui/react";
import { useEffect, useRef } from "react";

export const AutoSendInitialPrompt = ({
  initialPrompt,
  onPromptConsumed
}: {
  initialPrompt: string;
  onPromptConsumed: () => void;
}) => {
  const api = useAssistantApi();
  const hasSentRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initialPrompt) return;
    if (hasSentRef.current) return;
    hasSentRef.current = true;

    const thread = api.thread();

    thread.append({
      role: "user",
      content: [{ type: "text", text: initialPrompt }]
    });

    thread.startRun({ parentId: null });
    onPromptConsumed?.();
  }, [api, initialPrompt, onPromptConsumed]);

  return null;
};
