import ClientChatPage from "@/components/_client-chat-page";
import { getSessionByPublicId } from "@/server/db/prisma";

export default async function sessionPage(props: { params: Promise<{ publicId: string }> }) {
  const params = await props.params;

  const session = await getSessionByPublicId({
    publicId: params.publicId
  });

  if (!session) {
    return <div className="h-screen w-screen text-5xl">세션을 찾을 수 없습니다.</div>;
  }

  return (
    <ClientChatPage
      publicId={session.publicId}
      model={session.model ?? ""}
      initialMessages={session.messages}
    />
  );
}
