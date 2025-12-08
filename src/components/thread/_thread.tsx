import { AssistantMessage } from "@/components/thread/assistant-message";
import { Composer } from "@/components/thread/composer";
import { EditComposer } from "@/components/thread/edit-composer";
import { ThreadWelcome } from "@/components/thread/thread-welcome";
import { UserMessage } from "@/components/thread/user-message";
import { TooltipIconButton } from "@/ui/tooltip-icon-button";

import { ThreadPrimitive } from "@assistant-ui/react";
import { ArrowDownIcon } from "lucide-react";
import { type FC } from "react";

export default function Thread() {
  return (
    <ThreadPrimitive.Root
      className="aui-root aui-thread-root bg-background @container flex h-full flex-col"
      style={{
        ["--thread-max-width" as string]: "44rem"
      }}
    >
      <ThreadPrimitive.Viewport
        turnAnchor="top"
        className="aui-thread-viewport relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll
scroll-smooth px-4 pt-4"
      >
        <ThreadPrimitive.If empty>
          <ThreadWelcome />
        </ThreadPrimitive.If>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            EditComposer,
            AssistantMessage
          }}
        />

        <ThreadPrimitive.ViewportFooter
          className="aui-thread-viewport-footer bg-background sticky bottom-0 mx-auto mt-4 flex w-full
max-w-(--thread-max-width) flex-col gap-4 overflow-visible rounded-t-3xl pb-4 md:pb-6"
        >
          <ThreadScrollToBottom />
          <Composer />
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
}

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="aui-thread-scroll-to-bottom dark:bg-background dark:hover:bg-accent absolute -top-12
z-10 self-center rounded-full p-4 disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};
