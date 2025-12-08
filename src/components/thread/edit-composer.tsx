import { Button } from "@/ui/button";

import { ComposerPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { type FC } from "react";

export const EditComposer: FC = () => {
  return (
    <MessagePrimitive.Root
      className="aui-edit-composer-wrapper mx-auto flex w-full max-w-(--thread-max-width) flex-col gap-4
px-2"
    >
      <ComposerPrimitive.Root
        className="aui-edit-composer-root bg-muted ml-auto flex w-full max-w-7/8 flex-col rounded-xl"
      >
        <ComposerPrimitive.Input
          className="aui-edit-composer-input text-foreground flex min-h-[60px] w-full resize-none
bg-transparent p-4 outline-none"
          autoFocus
        />

        <div
          className="aui-edit-composer-footer mx-3 mb-3 flex items-center justify-center gap-2 self-end"
        >
          <ComposerPrimitive.Cancel asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Cancel edit"
            >
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button
              size="sm"
              aria-label="Update message"
            >
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </MessagePrimitive.Root>
  );
};
