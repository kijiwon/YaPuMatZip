import { signInWithGoogle, signInWithKakao } from "@/app/login/actions";
import { BiSolidMessageRounded } from "react-icons/bi";

export function GoogleLoginButton() {
  return (
    <button
      className="h-[52px] flex flex-row items-center pl-[13px] bg-[#4285F4] rounded-[12px]"
      onClick={signInWithGoogle}
    >
      <img src="/g-logo.png" className="w-[40px]" />
      <span className=" font-roboto text-white mr-auto ml-auto text-[18px]">
        구글 로그인
      </span>
    </button>
  );
}
export function KakaoLoginButton() {
  return (
    <button
      className="h-[52px] flex flex-row items-center pl-[22px]  bg-[#FEE500] rounded-[12px]  "
      onClick={signInWithKakao}
    >
      <BiSolidMessageRounded color="black" size={"26px"} />
      <span className="text-black opacity-85 mr-auto ml-auto text-[18px]">
        카카오 로그인
      </span>
    </button>
  );
}
