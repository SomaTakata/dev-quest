'use client';

import { useEffect, useState } from "react";

const TestPage = () => {

  const [chatCompletion, setChatCompletion] = useState("ok");

  // useEffect(() => {
  //   fetch('/api/chat-completion').then(async (res) => {
  //     const data = await res.json();
  //     setChatCompletion(data);
  //   })
  // }, []);

  return (
    <div>
      {chatCompletion}
    </div>
  );
};

export default TestPage;