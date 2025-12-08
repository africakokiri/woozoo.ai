import SessionPage from "@/components/_session-page";
import { getSessionByPublicId } from "@/server/db/prisma";

export default async function sessionPage({ params }: { params: { publicId: string } }) {
  const session = await getSessionByPublicId({
    params
  });

  if (!session) {
    return <div className="h-screen w-screen text-5xl">세션을 찾을 수 없습니다.</div>;
  }

  // return <SessionPage />;
}
