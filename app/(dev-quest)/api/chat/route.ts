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
          content: `
          [役割]
          あなたは、エンジニアの面接官です。
          エントリーシートの質問を提示するので、3つ以上のサブクエスチョンに分割ししてください。
          出力には、分割したサブクエスチョンとidをつけてmapで展開できるような形で出力してください。

          [出力形式]
          json
          subquestion:
          {
            "id": "int",
            "question": "string"
          }
        `,
        },
        {
          role: "user",
          content: `質問：${question}`,
        },
      ],
    });
    console.log(completion.choices[0].message.content);
    return NextResponse.json(completion.choices[0].message.content);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
