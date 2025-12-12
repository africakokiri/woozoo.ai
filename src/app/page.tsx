"use client";

import ThreadClientSideRenderer from "@/contexts/thread-client-side-renderer";

export default function page() {
  return (
    <div className="h-dvh">
      <ThreadClientSideRenderer />
    </div>
  );
}
