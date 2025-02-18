"use client";
import "regenerator-runtime/runtime";
import { Dispatch } from "react";
import { MdKeyboardVoice } from "react-icons/md";
// import { RiVoiceprintFill } from "react-icons/ri";
import { FaRegStopCircle } from "react-icons/fa";
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

  const onClickStopVoice = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition)
    return <div>지원하지 않는 브라우저입니다.</div>;

  return (
    <div>
      {listening ? (
        <FaRegStopCircle
          onClick={onClickStopVoice}
          className="cursor-pointer mr-[5px] lg:text-[30px] text-[24px] text-gray-400"
        />
      ) : (
        <MdKeyboardVoice
          onClick={onClickVoice}
          className="cursor-pointer mr-[5px] lg:text-[30px] text-[24px]"
        />
      )}
    </div>
  );
}
