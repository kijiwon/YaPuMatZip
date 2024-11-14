"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function Record() {
  const [script, setScript] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";

  const onClickRecord = () => {
    recognition.start();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript;
      setScript(transcript);
    };
  };

  useEffect(() => {
    console.log(">>script", script);
  }, [script]);

  return (
    <div>
      <button onClick={onClickRecord}>음성 시작하기</button>

      {script}
    </div>
  );
}
