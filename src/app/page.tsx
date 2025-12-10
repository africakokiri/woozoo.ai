import { createUserIfNotExist } from "@/utils/server/prisma";

export default async function mainPage() {
  await createUserIfNotExist();
}
