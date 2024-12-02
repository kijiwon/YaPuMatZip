"use client";
import { signInWithGoogle, signInWithKakao } from "@/app/api/login";

export function GoogleLoginButton({ location }: { location: string }) {
  return (
    <div>
      구글 로그인 버튼
      <button onClick={() => signInWithGoogle(location)}>로그인</button>
    </div>
  );
}
export function KakaoLoginButton({ location }: { location: string }) {
  return (
    <div>
      카카오 로그인 버튼
      <button onClick={() => signInWithKakao(location)}>로그인</button>
    </div>
  );
}
