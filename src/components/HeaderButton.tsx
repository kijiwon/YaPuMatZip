"use client";

import { signOut } from "@/app/login/actions";
import { useRouter } from "next/navigation";

export function HeaderLoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth")}
      className=" w-[110px] h-[40px] rounded-[10px]  bg-main-blue text-white font-paper_logy text-[20px] hover:bg-main-light-blue  "
    >
      로그인
    </button>
  );
}

export function HeaderLogoutButton() {
  const handleLogout = () => {
    signOut();
    window.location.reload();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
