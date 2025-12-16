import { ModelSelectorRenderer } from "@/components/ai-elements/model-selector-renderer";
import { ComposerAddAttachment, ComposerAttachments } from "@/components/assistant-ui/attachment";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/ui/button";
import { createChatSession } from "@/utils/server/db/chat";
import { useModelStore } from "@/utils/zustand/use-model";

import { AssistantIf, ComposerPrimitive } from "@assistant-ui/react";
import { ArrowUpIcon, Mic, SquareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type FC, type FormEvent, useState } from "react";

export const Composer: FC = () => {
  const [prompt, setPrompt] = useState("");
  const { model } = useModelStore();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setPrompt("");
    if (params.id) return;

    const session = await createChatSession({
      title: prompt,
      model
    });

    router.push(`/chat/${session.id}`);
  };

  return (
    <ComposerPrimitive.Root
      className="aui-composer-root relative flex w-full flex-col"
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
        />
        <ComposerAction />
      </ComposerPrimitive.AttachmentDropzone>
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <div className="aui-composer-action-wrapper relative mx-2 mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ComposerAddAttachment />
          <TooltipIconButton
            className="aui-composer-add-attachment hover:bg-muted-foreground/15
dark:border-muted-foreground/15 dark:hover:bg-muted-foreground/30 size-[34px] rounded-full p-1 text-xs
font-semibold"
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
            variant="default"
            className="aui-composer-send size-8 rounded-full"
            aria-label="Send message"
            tooltip="Send message"
            side="bottom"
            type="submit"
            size="icon"
          >
            <ArrowUpIcon className="aui-composer-send-icon size-4" />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </AssistantIf>

      <AssistantIf condition={({ thread }) => thread.isRunning}>
        <ComposerPrimitive.Cancel asChild>
          <Button
            variant="default"
            className="aui-composer-cancel size-8 rounded-full"
            aria-label="Stop generating"
            type="button"
            size="icon"
          >
            <SquareIcon className="aui-composer-cancel-icon size-3 fill-current" />
          </Button>
        </ComposerPrimitive.Cancel>
      </AssistantIf>
    </div>
  );
};
