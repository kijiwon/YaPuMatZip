"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

interface Props {
  fn?: () => void;
}

export default function BackButton({ fn }: Props) {
  const router = useRouter();
  const onClickButton = () => {
    router.back();
  };
  return (
    <button
      className="flex flex-row items-center mb-[10px] text-[18px] font-paper_logy"
      onClick={fn ? fn : onClickButton}
    >
      <IoMdArrowRoundBack />
      뒤로가기
    </button>
  );
}
