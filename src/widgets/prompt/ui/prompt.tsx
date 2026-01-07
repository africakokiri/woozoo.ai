"use client";

import { Button } from "@/shared/ui/button";

import { ArrowUp, Mic, Plus } from "lucide-react";
import Textarea from "react-textarea-autosize";

export default function Prompt() {
  return (
    <form
      className="flex flex-col rounded-3xl border border-neutral-500 transition-all duration-200
focus-within:shadow-2xl"
    >
      <Textarea
        className="w-full resize-none rounded-2xl px-4 py-3 outline-none"
        minRows={2}
        maxRows={10}
        placeholder="Ask me anything"
      />

      <div className="flex w-full justify-between px-4 pb-3 **:rounded-full">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
          >
            <Plus />
          </Button>

          <Button
            variant="outline"
            size="icon"
          >
            <Mic />
          </Button>
        </div>

        <Button size="icon">
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
}
