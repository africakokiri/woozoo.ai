import { Button } from "@/ui/button";

import { ArrowUp, Mic, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

export const Composer = () => {
  const [prompt, setPrompt] = useState("");
  const [isMounted, setIsMounted] = useState(false);
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
      className="relative"
      onSubmit={handleOnSubmit}
    >
      <Textarea
        className="border-input placeholder:text-muted-foreground focus-visible:border-ring
focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none
rounded-3xl border bg-transparent px-4 pt-4 pb-12 text-base shadow-xs transition-[color,box-shadow]
outline-none focus-visible:shadow-xl focus-visible:ring-[3px] disabled:cursor-not-allowed
disabled:opacity-50 md:text-sm"
        minRows={2}
        maxRows={8}
        value={prompt}
        ref={textareaRef}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div
        className="absolute bottom-0 flex w-full justify-between p-2 [&_button]:size-8
[&_button]:rounded-full"
      >
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
          variant={prompt.length > 0 ? "default" : "ghost"}
          type="submit"
          disabled={prompt.length > 0 ? false : true}
        >
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
};
