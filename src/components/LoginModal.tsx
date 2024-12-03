import { GoogleLoginButton, KakaoLoginButton } from "@/components/LoginButton";
import BackButton from "./BackButton";

export default function Modal() {
  return (
    <div className="w-[400px] h-[280px] mb-[10px] pt-[10px] px-[10px] bg-white z-10 border-[1px] rounded-md ">
      <BackButton />
      <div className="flex flex-row items-center mb-[20px]">
        <hr className="flex-1" />
        <p className="text-[14px] font-s_core mx-[10px]">간편 로그인</p>
        <hr className="flex-1" />
      </div>
      <div className="grid grid-rows-2 gap-4">
        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
