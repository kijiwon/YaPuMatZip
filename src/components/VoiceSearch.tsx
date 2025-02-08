"use client";
import { Dispatch } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { RiVoiceprintFill } from "react-icons/ri";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface Props {
  setTerms: Dispatch<React.SetStateAction<string>>;
}

export default function Record({ setTerms }: Props) {
  const {
    transcript, // 마이크로 인식한 텍스트 저장
    listening, // 마이크 ON, OFF 상태 저장
    resetTranscript, // RESET 함수
    browserSupportsSpeechRecognition, // 기본 함수
  } = useSpeechRecognition();

  const onClickVoice = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "ko" });
    setTerms(transcript);
  };

  if (browserSupportsSpeechRecognition)
    return <div>지원하지 않는 브라우저입니다.</div>;
  // const SpeechRecognition =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;
  // const recognition = new SpeechRecognition();

  // recognition.lang = "ko-KR";

  // const onClickVoice = () => {
  //   recognition.start();
  //   recognition.onresult = async (e: SpeechRecognitionEvent) => {
  //     const transcript = e.results[0][0].transcript;
  //     setTerms(transcript);
  //   };
  // };

  return (
    <div>
      {listening ? (
        <RiVoiceprintFill />
      ) : (
        <MdKeyboardVoice
          onClick={onClickVoice}
          className="cursor-pointer mr-[5px] lg:text-[30px] text-[24px]"
        />
      )}
    </div>
  );
}
