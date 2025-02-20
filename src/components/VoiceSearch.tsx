"use client";
import "regenerator-runtime/runtime";
import { Dispatch, useEffect } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { FaStop } from "react-icons/fa";
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
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 2000);
  }, [transcript, setTerms]);

  if (!browserSupportsSpeechRecognition)
    return <div>지원하지 않는 브라우저입니다.</div>;

  return (
    <div className="lg:w-[50px] lg:h-[50px] w-[32px] h-[38px] flex justify-center items-center lg:border-[3px] bg-gray-200 text-main-blue rounded-md lg:ml-[12px] ml-[5px]">
      {listening ? (
        <FaStop
          onClick={onClickStopVoice}
          className="cursor-pointer lg:text-[25px] text-[20px] mx-1 lg:m-0"
        />
      ) : (
        <MdKeyboardVoice
          onClick={onClickVoice}
          className="cursor-pointer lg:text-[36px] text-[28px]"
        />
      )}
    </div>
  );
}
