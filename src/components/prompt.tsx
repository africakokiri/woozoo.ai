"use client";

import { Button } from "@/ui/button";

import { ArrowBigUp, Mic, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const Prompt = () => {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPrompt("");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onClick={() => textareaRef.current?.focus()}
      className="has-[:focus]:border-primary h-fit space-y-4 rounded-md border p-4"
    >
      <TextareaAutosize
        ref={textareaRef}
        className="w-full resize-none text-base outline-none"
        placeholder="Ask anything"
        minRows={1}
        maxRows={10}
        autoFocus
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            if (e.nativeEvent.isComposing) return;

            e.preventDefault();

            if (prompt.length === 0) return;

            formRef.current?.requestSubmit();
          }
        }}
      />

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Btn>
            <Plus />
          </Btn>

          <Btn>
            <Mic />
          </Btn>
        </div>

        <div>
          <Button
            variant={prompt.length > 0 ? "default" : "ghost"}
            size="icon-sm"
            type={prompt.length > 0 ? "submit" : "button"}
            disabled={prompt.length === 0}
          >
            <ArrowBigUp />
          </Button>
        </div>
      </div>
    </form>
  );
};

const Btn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      type="button"
    >
      {children}
    </Button>
  );
};
