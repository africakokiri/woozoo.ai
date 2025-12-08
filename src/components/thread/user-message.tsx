import { BranchPicker } from "@/components/thread/branch-picker";
import { UserMessageAttachments } from "@/ui/attachment";
import { TooltipIconButton } from "@/ui/tooltip-icon-button";

import { ActionBarPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { PencilIcon } from "lucide-react";
import { type FC } from "react";

export const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root
      className="aui-user-message-root fade-in slide-in-from-bottom-1 animate-in mx-auto grid w-full
max-w-(--thread-max-width) auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] content-start gap-y-2 px-2
py-4 duration-150 ease-out [&:where(>*)]:col-start-2"
      data-role="user"
    >
      <UserMessageAttachments />

      <div className="aui-user-message-content-wrapper relative col-start-2 min-w-0">
        <div
          className="aui-user-message-content bg-muted text-foreground rounded-3xl px-5 py-2.5
wrap-break-word"
        >
          <MessagePrimitive.Parts />
        </div>
        <div
          className="aui-user-action-bar-wrapper absolute top-1/2 left-0 -translate-x-full
-translate-y-1/2 pr-2"
        >
          <UserActionBar />
        </div>
      </div>

      <BranchPicker
        className="aui-user-branch-picker col-span-full col-start-1 row-start-3 -mr-1 justify-end"
      />
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="aui-user-action-bar-root flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton
          tooltip="Edit"
          className="aui-user-action-edit p-4"
        >
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};
