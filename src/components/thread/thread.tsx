"use client";

import { Composer } from "@/components/thread/composer";
import { Conversation } from "@/components/thread/conversation";

export default function Thread() {
  return (
    <div className="flex h-dvh flex-col justify-between py-10">
      <Conversation />
      <Composer />
    </div>
  );
}
