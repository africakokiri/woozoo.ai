"use server";

import { prisma } from "@/utils/prisma/prisma";

import { auth, currentUser } from "@clerk/nextjs/server";

type CreateChatSession = {
  userId: string;
  title: string;
  model: string;
};

// 새로운 채팅 세션을 생성하는 함수
export const createChatSession = async (data: CreateChatSession) => {
  return await prisma.chatSession.create({
    data: {
      userId: data.userId,
      title: data.title,
      model: data.model
    }
  });
};
// 세션을 조회하는 함수
export const getSessionId = async (sessionId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.findFirst({
    where: {
      id: sessionId,
      userId // 본인 세션만
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });
};

// 유저가 없으면 생성, 있으면 아무것도 하지 않는 함수
export const ensureUser = async (userId: string) => {
  const clerkUser = await currentUser();

  return await prisma.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      email: clerkUser?.emailAddresses[0].emailAddress,
      displayName: clerkUser?.firstName || clerkUser?.username,
      imageUrl: clerkUser?.imageUrl
    },
    update: {}
  });
};

// 모든 세션 목록 가져오기
export const listChatSessions = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      isArchived: true
    }
  });
};

// 세션 제목 변경
export const renameChatSession = async (sessionId: string, title: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.updateMany({
    where: {
      id: sessionId,
      userId
    },
    data: { title }
  });
};

// 세션 아카이브
export const archiveChatSession = async (sessionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.updateMany({
    where: {
      id: sessionId,
      userId
    },
    data: { isArchived: true }
  });
};

// 세션 아카이브 해제
export const unarchiveChatSession = async (sessionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.updateMany({
    where: {
      id: sessionId,
      userId
    },
    data: { isArchived: false }
  });
};

// 세션 삭제 (메시지도 함께)
export const deleteChatSession = async (sessionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 메시지 먼저 삭제
  await prisma.chatMessage.deleteMany({
    where: { sessionId }
  });

  // 세션 삭제
  return await prisma.chatSession.deleteMany({
    where: {
      id: sessionId,
      userId
    }
  });
};

// 메시지 목록 가져오기
export const getChatMessages = async (sessionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 권한 확인
  const session = await prisma.chatSession.findFirst({
    where: {
      id: sessionId,
      userId
    }
  });

  if (!session) throw new Error("Session not found");

  return await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" }
  });
};
