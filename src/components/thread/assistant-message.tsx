import { MessageError } from "@/components/thread/message-error";
import { MarkdownText } from "@/ui/markdown-text";
import { ToolFallback } from "@/ui/tool-fallback";
import { TooltipIconButton } from "@/ui/tooltip-icon-button";

import { ActionBarPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";
import { type FC } from "react";

export const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root
      className="aui-assistant-message-root fade-in slide-in-from-bottom-1 animate-in relative mx-auto
w-full max-w-(--thread-max-width) py-4 duration-150 ease-out"
      data-role="assistant"
    >
      <div className="aui-assistant-message-content text-foreground mx-2 leading-7 wrap-break-word">
        <MessagePrimitive.Parts
          components={{
            Text: MarkdownText,
            tools: { Fallback: ToolFallback }
          }}
        />
        <MessageError />
      </div>

      <div className="aui-assistant-message-footer mt-2 ml-2 flex">
        <BranchPicker />
        <AssistantActionBar />
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="aui-assistant-action-bar-root text-muted-foreground data-floating:bg-background
col-start-3 row-start-2 -ml-1 flex gap-1 data-floating:absolute data-floating:rounded-md
data-floating:border data-floating:p-1 data-floating:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};
