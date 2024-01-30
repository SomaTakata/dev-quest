import { currentUser } from "@clerk/nextjs";
import DashBoard from "../_components/DashBoard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const user = await currentUser();

  // サインアップ後初回ログインの時は、user.id を DB に保存する
  const userInDB = await prisma.user.findUnique({
    where: { id: user!.id },
  });

  if (!userInDB) {
    await prisma.user.create({
      data: {
        id: user!.id,
      },
    });
  }

  return <DashBoard />;
}
