import { Button } from "@/ui/button";

import { ArrowUp, Mic, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

export const Composer = () => {
  const [prompt, setPrompt] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <form
      className="border-input placeholder:text-muted-foreground focus-within:border-ring
focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none
flex-col rounded-3xl border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none
focus-within:shadow-xl focus-within:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50
md:text-sm"
      onSubmit={handleOnSubmit}
      ref={formRef}
    >
      <Textarea
        className="h-full w-full resize-none border-none px-4 pt-4 outline-none"
        minRows={2}
        maxRows={8}
        value={prompt}
        ref={textareaRef}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          // Enter + Shift일 때 아무런 동작하지 않는다.
          if (e.key === "Enter" && !e.shiftKey) e.preventDefault();

          // 마지막 글자가 폼 전송 때 포함되는 것을 방지한다.
          if (e.nativeEvent.isComposing) return;

          // Enter + prompt.length > 0일 때 폼을 제출한다.
          if (formRef.current && e.key === "Enter" && !e.shiftKey && prompt.trim().length > 0) {
            (formRef.current as HTMLFormElement).requestSubmit();
          }
        }}
      />

      <div className="flex w-full justify-between p-2 [&_button]:size-8 [&_button]:rounded-full">
        <div className="space-x-2">
          <Button
            variant="ghost"
            type="button"
          >
            <Plus />
          </Button>

          <Button
            variant="ghost"
            type="button"
          >
            <Mic />
          </Button>
        </div>

        <Button
          variant={prompt.trim().length > 0 ? "default" : "ghost"}
          type="submit"
          disabled={prompt.trim().length > 0 ? false : true}
        >
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
};
