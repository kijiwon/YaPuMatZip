"use client";

import { BiSolidMessageRounded } from "react-icons/bi";
import { useRouter } from "next/navigation";
import {
  signInWithGoogle,
  signInWithKakao,
  signOut,
} from "@/app/actions/login/login-actions";
import Image from "next/image";
import GoogleLogo from "./../../public/g-logo.png";
import { useState } from "react";

export function HeaderLoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth")}
      className="lg:w-[100px] lg:h-[45px] rounded-[10px] bg-main-blue text-white font-paper_logy lg:text-[18px] text-[16px] text-center hover:bg-main-light-blue"
    >
      로그인
    </button>
  );
}

export function HeaderLogoutButton() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggedOut) return;
    setIsLoggedOut(true);
    await signOut();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full border-b-[1px] border-dashed text-main-red text-start pl-1"
    >
      로그아웃
    </button>
  );
}

export function GoogleLoginButton() {
  return (
    <button
      className="lg:h-[52px] h-fit flex flex-row items-center pl-[13px] py-1 bg-[#4285F4] rounded-[12px]"
      onClick={signInWithGoogle}
    >
      <Image width={40} alt="google-logo" src={GoogleLogo} />
      <span className=" font-roboto text-white mr-auto ml-auto text-[18px]">
        구글 로그인
      </span>
    </button>
  );
}
export function KakaoLoginButton() {
  return (
    <button
      className="lg:h-[52px] h-[48px] flex flex-row items-center pl-[22px] bg-[#FEE500] rounded-[12px]  "
      onClick={signInWithKakao}
    >
      <BiSolidMessageRounded color="black" size={"26px"} />
      <span className="text-black opacity-85 mr-auto ml-auto text-[18px]">
        카카오 로그인
      </span>
    </button>
  );
}
