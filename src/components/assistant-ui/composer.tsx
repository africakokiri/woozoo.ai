"use client";

import { ModelSelectorRenderer } from "@/components/ai-elements/model-selector-renderer";
import { ComposerAddAttachment, ComposerAttachments } from "@/components/assistant-ui/attachment";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/ui/button";
import { useModelStore } from "@/utils/zustand/use-model";

import { AssistantIf, ComposerPrimitive } from "@assistant-ui/react";
import { ArrowUpIcon, Mic, SquareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Composer = () => {
  const [prompt, setPrompt] = useState("");
  const { model } = useModelStore();
  const params = useParams<{ publicId: string }>();
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    formData.append("prompt", prompt);
    formData.append("model", model);

    setPrompt("");
    if (params.publicId) return;

    const publicId = uuidv4();

    router.replace(`/chat/${publicId}`);
  };

  return (
    <ComposerPrimitive.Root
      className="aui-composer-root relative mx-auto flex w-full flex-col"
      onSubmit={handleOnSubmit}
    >
      <ComposerPrimitive.AttachmentDropzone
        className="aui-composer-attachment-dropzone border-input bg-background
has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-ring/20
data-[dragging=true]:border-ring data-[dragging=true]:bg-accent/50 flex w-full flex-col rounded-2xl
border px-1 pt-2 transition-shadow outline-none has-[textarea:focus-visible]:ring-2
data-[dragging=true]:border-dashed"
      >
        <ComposerAttachments />
        <ComposerPrimitive.Input
          className="aui-composer-input placeholder:text-muted-foreground mb-1 max-h-32 min-h-14 w-full
resize-none bg-transparent px-4 pt-2 pb-3 text-sm outline-none focus-visible:ring-0"
          aria-label="Message input"
          placeholder="Send a message..."
          rows={1}
          autoFocus
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <ComposerAction />
      </ComposerPrimitive.AttachmentDropzone>
    </ComposerPrimitive.Root>
  );
};

const ComposerAction = () => {
  return (
    <div
      className="aui-composer-action-wrapper relative mx-1 mt-2 mb-2 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ComposerAddAttachment />
          <TooltipIconButton
            className="focus-visible:border-ring focus-visible:ring-ring/50
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
hover:text-accent-foreground aui-button-icon aui-composer-add-attachment hover:bg-muted-foreground/15
dark:border-muted-foreground/15 dark:hover:bg-muted-foreground/30 inline-flex size-[34px] shrink-0
items-center justify-center gap-2 rounded-full p-1 text-xs font-semibold whitespace-nowrap transition-all
outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            aria-label="Voice input"
            tooltip="Voice input"
            side="top"
          >
            <Mic className="size-5 stroke-[1.5px]" />
          </TooltipIconButton>
        </div>

        <ModelSelectorRenderer />
      </div>

      <AssistantIf condition={({ thread }) => !thread.isRunning}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            className="aui-composer-send size-8 rounded-full"
            aria-label="Send message"
            tooltip="Send message"
            side="bottom"
            type="submit"
            variant="default"
            size="icon"
          >
            <ArrowUpIcon className="aui-composer-send-icon size-4" />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </AssistantIf>

      <AssistantIf condition={({ thread }) => thread.isRunning}>
        <ComposerPrimitive.Cancel asChild>
          <Button
            className="aui-composer-cancel size-8 rounded-full"
            aria-label="Stop generating"
            type="button"
            variant="default"
            size="icon"
          >
            <SquareIcon className="aui-composer-cancel-icon size-3 fill-current" />
          </Button>
        </ComposerPrimitive.Cancel>
      </AssistantIf>
    </div>
  );
};
