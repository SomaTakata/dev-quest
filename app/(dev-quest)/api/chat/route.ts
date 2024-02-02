import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("get start");

    const { userId } = auth();
    const body = await req.json();
    const { question } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!question) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `エントリーシートの質問を3つ以上のサブクエスチョンに分割ししてください。'。
          出力は、json形式で、サブクエスチョンのみを返して`,
        },
        {
          role: "user",
          content: `質問：${question}`,
        },
      ],
    });

    return NextResponse.json(completion.choices[0].message.content);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
