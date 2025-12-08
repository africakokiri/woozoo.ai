"use client";

import { ModelSelectorComponent } from "@/components/thread/model-selector-component";
import { startNewChat } from "@/server/actions/start-new-chat";
import { ComposerAddAttachment, ComposerAttachments } from "@/ui/attachment";
import { Button } from "@/ui/button";
import { TooltipButton } from "@/ui/tooltip-button";
import { TooltipIconButton } from "@/ui/tooltip-icon-button";

import { ComposerPrimitive, ThreadPrimitive } from "@assistant-ui/react";
import { ArrowUpIcon, Mic, Square } from "lucide-react";
import { type FC, type FormEvent, useState } from "react";

export const Composer: FC = () => {
  const [prompt, setPrompt] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.set("prompt", prompt);

    setPrompt("");

    await startNewChat(formData);
  };

  return (
    // form 요소
    <ComposerPrimitive.Root
      onSubmit={onSubmit}
      className="aui-composer-root relative flex w-full flex-col"
    >
      <ComposerPrimitive.AttachmentDropzone
        className="aui-composer-attachment-dropzone border-input bg-background
has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-ring/50
data-[dragging=true]:border-ring data-[dragging=true]:bg-accent/50 dark:bg-background flex w-full
flex-col rounded-3xl border px-1 pt-2 shadow-lg transition-[color,box-shadow] outline-none
has-[textarea:focus-visible]:ring-[3px] data-[dragging=true]:border-dashed dark:shadow-neutral-800"
      >
        <ComposerAttachments />
        <ComposerPrimitive.Input
          placeholder="Send a message..."
          className="aui-composer-input placeholder:text-muted-foreground mb-1 max-h-32 min-h-16 w-full
resize-none bg-transparent px-3.5 pt-1.5 pb-3 text-base outline-none focus-visible:ring-0"
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoFocus
          aria-label="Message input"
        />
        <ComposerAction />
      </ComposerPrimitive.AttachmentDropzone>
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <div
      className="aui-composer-action-wrapper relative mx-1 mt-2 mb-2 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ComposerAddAttachment />
          <TooltipButton
            className="hover:bg-muted-foreground/15 dark:border-muted-foreground/15
dark:hover:bg-muted-foreground/30 font-semibol flex size-[34px] items-center justify-center rounded-full
p-1 text-xs"
            tooltipMessage="Voice input"
            side="top"
            aria-label="Voice input"
          >
            <Mic className="size-5 stroke-[1.5px]" />
          </TooltipButton>
        </div>

        <ModelSelectorComponent />
      </div>

      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send message"
            side="bottom"
            type="submit"
            variant="default"
            size="icon"
            className="aui-composer-send size-[34px] rounded-full p-1"
            aria-label="Send message"
          >
            <ArrowUpIcon className="aui-composer-send-icon size-5" />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>

      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <Button
            type="button"
            variant="default"
            size="icon"
            className="aui-composer-cancel border-muted-foreground/60 hover:bg-primary/75
dark:border-muted-foreground/90 size-[34px] rounded-full border"
            aria-label="Stop generating"
          >
            <Square className="aui-composer-cancel-icon size-3.5 fill-white dark:fill-black" />
          </Button>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </div>
  );
};
