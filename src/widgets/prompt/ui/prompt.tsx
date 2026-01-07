"use client";

import Textarea from "react-textarea-autosize";

export default function Prompt() {
  return (
    <form
      className="flex rounded-3xl border border-neutral-500 transition-all duration-200
focus-within:shadow-2xl"
    >
      <Textarea
        className="w-full resize-none rounded-2xl px-4 py-3 outline-none"
        minRows={2}
        maxRows={10}
        placeholder="Ask me anything"
      />
    </form>
  );
}
