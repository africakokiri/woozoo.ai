"use client";

import { generateStreamValue } from "@/utils/server/generate-stream-value";
import { useGlobalDataStore } from "@/utils/zustand/store";

import { readStreamableValue } from "@ai-sdk/rsc";
import { useEffect, useState } from "react";

export const Conversation = () => {
  const [generation, setGeneration] = useState<string>("");
  const { prompt } = useGlobalDataStore();

  useEffect(() => {
    (async () => {
      const { output } = await generateStreamValue(prompt);

      for await (const delta of readStreamableValue(output)) {
        setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
      }
    })();
  }, [prompt]);

  return (
    <div>
      <pre>{generation}</pre>
    </div>
  );
};
