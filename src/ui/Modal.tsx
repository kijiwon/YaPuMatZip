"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useRouter } from "next/navigation";
import React from "react";

export default function Modal() {
  const router = useRouter();
  const uri = decodeURI(window.location.href);

  return (
    <div className="w-[400px] h-[300px] mb-[20px] bg-white z-10 border-2 ">
      <button onClick={() => router.back()}>뒤로가기</button>
      <div>
        <GoogleLoginButton location={uri} />
      </div>
    </div>
  );
}
