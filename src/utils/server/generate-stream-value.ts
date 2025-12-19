"use server";

import { google } from "@ai-sdk/google";
import { createStreamableValue } from "@ai-sdk/rsc";
import { streamText } from "ai";

export const generateStreamValue = async (prompt: string) => {
  // - createStreamableValue()
  //클라이언트로 스트리밍할 수 있는, 변경 가능한 래핑된 값을 생성합니다. 클라이언트 측에서는 readStreamableValue() API를 통해 해당 값에 접근할 수 있습니다.
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: google("gemini-2.5-flash-lite"),
      prompt
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
};
