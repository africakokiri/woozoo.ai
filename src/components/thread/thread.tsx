"use client";

import { Composer } from "@/components/thread/composer";
import { Conversation } from "@/components/thread/conversation";

export default function Thread() {
  return (
    <div className="flex h-dvh flex-col justify-between pt-10">
      <Conversation />

      <div className="sticky bottom-10">
        <Composer />
      </div>
    </div>
  );
}
