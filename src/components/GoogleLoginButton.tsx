"use client";
import { signInWithGoogle } from "@/app/api/login";

export default function GoogleLoginButton({ location }: { location: string }) {
  return (
    <div>
      구글 로그인 버튼
      <button onClick={() => signInWithGoogle(location)}>로그인</button>
    </div>
  );
}
