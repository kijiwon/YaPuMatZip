"use client";
import { signInWithGoogle, signInWithKakao } from "@/app/api/login";
import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import { useParams } from "next/navigation";
import { BiSolidMessageRounded } from "react-icons/bi";

export function GoogleLoginButton() {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace } = usePlaceStore();

  const { id, place } = useParams();
  console.log("path>>", decodeURIComponent(place as string));
  const location = selectedPlace
    ? `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}/stadium/${selectedStadium?.id}/${selectedPlace}`
    : `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}/stadium/${selectedStadium?.id}`;

  return (
    <button
      className="h-[52px] flex flex-row items-center pl-[13px] bg-[#4285F4] rounded-[12px]"
      onClick={() => signInWithGoogle(location)}
    >
      <img src="/g-logo.png" className="w-[40px]" />
      <span className=" font-roboto text-white mr-auto ml-auto text-[18px]">
        구글 로그인
      </span>
    </button>
  );
}
export function KakaoLoginButton() {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace } = usePlaceStore();

  const location = selectedPlace
    ? `${window.location.origin}/stadium/${selectedStadium?.id}/${selectedPlace}`
    : `${window.location.origin}/stadium/${selectedStadium?.id}`;

  return (
    <button
      className="h-[52px] flex flex-row items-center pl-[22px]  bg-[#FEE500] rounded-[12px]  "
      onClick={() => signInWithKakao(location)}
    >
      <BiSolidMessageRounded color="black" size={"26px"} />
      <span className="text-black opacity-85 mr-auto ml-auto text-[18px]">
        카카오 로그인
      </span>
    </button>
  );
}
