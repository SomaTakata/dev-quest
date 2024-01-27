import OpenAI from 'openai';
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  
  // const { userId } = getAuth(req);
  // if (!userId) {
  //   return new NextResponse(
  //     "Not Authorized",
  //     { status: 401 }
  //   );
  // }

  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "さばみそと叫んで、わんと鳴いてください。" }],
    model: "gpt-3.5-turbo",
  });

  return new NextResponse(
    completion.choices[0].message.content, 
    { status: 200}
  );
}