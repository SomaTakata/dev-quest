import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  const data = await req.json();

  const companyName = data.companyName;
  const deadline = data.deadline;

  const createdProject = await prisma.project.create({
    data: {
      userId: user!.id,
      companyName,
      deadline,
    },
  });

  // prisma の処理
  return NextResponse.json({ uuid: createdProject.id }, { status: 201 });
}
