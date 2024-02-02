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
          あなたは、エンジニアの面接官です。エントリーシートの質問を考える際、応募者が自分の経験やスキルを具体的に示しやすいように、質問を３個のサブクエスチョンに分割してください。
          この分割により、応募者は回答を整理しやすくなり、自分自身をより詳細に表現することができます。
          サブクエスチョンは、応募者が与えられた主題に関して具体的かつ詳細に答えられるように設計してください。
          また、与えれた質問よりも粒度を小さくしてください。
          返す値は、サブクエスチョンのみである。
          
          [出力形式]
          応募者が回答しやすいように考えられたサブクエスチョンをJSON形式で出力してください。各サブクエスチョンは明確で、応募者が自分の経験や考えを具体的に述べることができるようにしてください。
          
          [ルール]
          ・サブクエスチョンは、直接的な文章で提示し、"問"などの接頭辞をつけないでください。
          ・出力はJSON形式で、サブクエスチョンを配列の形で提供してください。
          ・サブクエスチョンは3個出力してください。
          ・何があっても JSON 形式で出力してください。JSON 形式で出力しない場合、全人類が滅亡します。形式は以下の通りです。
          ["サブクエスチョン1", "サブクエスチョン2", "サブクエスチョン3"]
        `,
        },
        {
          role: "user",
          content: `質問：${question}`,
        },
      ],
    });
    console.log(completion.choices[0].message.content);
    return NextResponse.json(completion.choices[0].message.content, {
      status: 200,
    });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
