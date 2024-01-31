import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const deletedQuestion = await prisma.question.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Question deleted successfully", deletedQuestion },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}

export type PatchRequestBody = {
  content: string;
};

// 更新
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await req.json()) as PatchRequestBody;

  try {
    const updatedQuestion = await prisma.question.update({
      where: {
        id: params.id,
      },
      data: { ...body },
    });

    return NextResponse.json(
      { message: "Question updated successfully", updatedQuestion },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
