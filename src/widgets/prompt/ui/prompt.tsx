"use client";

import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent } from "@/shared/ui/tooltip";
import { ModelSelectorRenderer } from "@/widgets/prompt/ui/model-selector-renderer";

import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { ArrowUp, Plus } from "lucide-react";
import { useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

export default function Prompt() {
  const [prompt, setPrompt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validPrompt = prompt.trim().length > 0;

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col rounded-3xl border border-neutral-500 transition-all duration-200
focus-within:shadow-2xl"
      ref={formRef}
      onSubmit={handleOnSubmit}
    >
      <Textarea
        className="w-full resize-none rounded-2xl px-4 py-3 outline-none"
        minRows={2}
        maxRows={10}
        autoFocus
        value={prompt}
        placeholder="Ask me anything"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) return;
            if (e.nativeEvent.isComposing) return;

            e.preventDefault();
            formRef.current?.requestSubmit();
            setPrompt("");
          }
        }}
      />

      <div className="flex w-full justify-between px-4 pb-3 **:rounded-full">
        <div className="flex gap-2">
          <TooltipButton
            tooltip="Attach files"
            component={
              <Button
                variant="outline"
                size="icon"
                type="button"
              >
                <Plus />
              </Button>
            }
          />

          <ModelSelectorRenderer />
        </div>

        <TooltipButton
          tooltip="Send message"
          component={
            <Button
              type="submit"
              size="icon"
              disabled={!validPrompt}
            >
              <ArrowUp />
            </Button>
          }
        />
      </div>
    </form>
  );
}

const TooltipButton = ({ tooltip, component }: { tooltip: string; component: React.ReactNode }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{component}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
