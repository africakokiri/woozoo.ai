"use client";

import { generateStreamValue } from "@/utils/server/generate-stream-value";

import { readStreamableValue } from "@ai-sdk/rsc";
import { useState } from "react";

export const Conversation = () => {
  const [generation, setGeneration] = useState<string>("");

  return (
    <div>
      <button
        onClick={async () => {
          const { output } = await generateStreamValue("Why is the sky blue?");

          for await (const delta of readStreamableValue(output)) {
            setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  );
};
