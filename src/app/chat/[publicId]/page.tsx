import PromptSender from "@/components/prompt-sender";
import Session from "@/components/session";

import { auth } from "@clerk/nextjs/server";

export default async function chatPage() {
  const { isAuthenticated } = await auth();

  return (
    <PromptSender>
      <Session isAuthenticated={isAuthenticated} />
    </PromptSender>
  );
}
