import ChatSession from "@/app/chat/[publicId]/(sessions)/chat-session";

export default async function chatPage(props: { params: Promise<{ publicId: string }> }) {
  const publicId = await props.params;

  return <ChatSession />;
}
