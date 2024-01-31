import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//追加
export async function POST(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { error: "projectIdがありません。" },
      { status: 500 },
    );
  }

  try {
    const createdQuestion = await prisma.question.create({
      data: {
        projectId,
        content: "",
      },
    });

    return NextResponse.json(
      {
        message: "プロジェクトの作成に成功しました。",
        id: createdQuestion.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "プロジェクトの作成に失敗しました。" },
      { status: 500 },
    );
  }
}

//取得
export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { error: "projectIdがありません。" },
      { status: 500 },
    );
  }
  try {
    const questionData = await prisma.question.findMany({
      where: {
        projectId,
      },
    });

    return NextResponse.json(
      { message: "プロジェクトの取得に成功しました。", data: questionData },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "プロジェクトの取得に失敗しました。" },
      { status: 500 },
    );
  }
}
