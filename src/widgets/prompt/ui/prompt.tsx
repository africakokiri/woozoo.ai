"use client";

import { Button } from "@/shared/ui/button";

import { ArrowUp, Mic, Plus } from "lucide-react";
import { useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

export default function Prompt() {
  const [prompt, setPrompt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validPrompt = prompt.trim().length > 0;

  return (
    <form
      className="flex flex-col rounded-3xl border border-neutral-500 transition-all duration-200
focus-within:shadow-2xl"
      ref={formRef}
    >
      <Textarea
        className="w-full resize-none rounded-2xl px-4 py-3 outline-none"
        minRows={2}
        maxRows={10}
        autoFocus
        placeholder="Ask me anything"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) return;
            if (e.nativeEvent.isComposing) return;

            formRef.current?.requestSubmit();
          }
        }}
      />

      <div className="flex w-full justify-between px-4 pb-3 **:rounded-full">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            type="button"
          >
            <Plus />
          </Button>

          <Button
            variant="outline"
            size="icon"
            type="button"
          >
            <Mic />
          </Button>
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={!validPrompt}
        >
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
}
