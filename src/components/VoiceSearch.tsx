"use client";
import "regenerator-runtime/runtime";
import { Dispatch, useEffect } from "react";
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
  };

  const onClickStopVoice = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  useEffect(() => {
    if (transcript) {
      setTerms(transcript);
      // 말이 끊기면 1초 후 종료
      const stopAfterSpeech = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 1000);

      return () => clearTimeout(stopAfterSpeech);
    }
  }, [transcript, setTerms]);

  if (!browserSupportsSpeechRecognition)
    return <div>지원하지 않는 브라우저입니다.</div>;

  return (
    <div className="lg:text-[30px] text-[24px] lg:mr-[5px] mr-[10px]">
      {listening ? (
        <FaRegStopCircle
          onClick={onClickStopVoice}
          className="cursor-pointer  text-gray-400"
        />
      ) : (
        <MdKeyboardVoice onClick={onClickVoice} className="cursor-pointer" />
      )}
    </div>
  );
}
