import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type QuestionContent = {
  content: string;
  subQuestions: {
    subSubQuestions: {
      questionContent: string;
      answerContent: string;
    }[];
  }[];
};

const generateQuestionPrompt = (question: QuestionContent) => {
  const subSubQuestionContents = question.subQuestions.flatMap((subQuestion) =>
    subQuestion.subSubQuestions.map((subSubQuestion) => {
      return `質問：${subSubQuestion.questionContent}\n回答：${subSubQuestion.answerContent}`;
    }),
  );

  const questionPrompt = `
  [今までの回答内容]
  ${subSubQuestionContents.join("\n\n")}
  
  [質問]
  今までの回答内容を踏まえて、次のエントリーシートの質問に回答してください。
  質問：${question.content}
  `;

  return questionPrompt;
};

export async function GET(req: NextRequest) {
  // return
  const { userId } = auth();
  const questionId = req.nextUrl.searchParams.get("id");

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!openai.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", {
      status: 500,
    });
  }

  if (!questionId) {
    return new NextResponse("Question ID required", { status: 400 });
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: {
      content: true,
      subQuestions: {
        select: {
          subSubQuestions: {
            select: {
              questionContent: true,
              answerContent: true,
            },
          },
        },
      },
    },
  });

  if (!question) {
    return NextResponse.json(
      { message: "Question not found" },
      { status: 404 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
          [役割]
          あなたは、エンジニアを志望する就活生です。後ほど今まであなたが回答した「自分についての自問自答形式の質問とその回答内容」を示すので、それらを統合して最後の質問に回答してください。もし最後の質問の中に文字数の指定があった場合はそれに従ってください。
          返す値は、最後の質問に対する回答のみである。
          
          [出力形式]
          最後に投げかけられたエントリーシートの質問に対して、就活生の立場で回答した文章を出力してください。
  
          [ルール]
          投げかけられた質問の中に文字列の指定があった場合はそれに従ってください。もし指定が無ければエントリーシートの回答として現実的な長さで回答してください。
          `,
        },
        {
          role: "user",
          content: generateQuestionPrompt(question),
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
