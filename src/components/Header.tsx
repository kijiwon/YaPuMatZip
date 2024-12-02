"use client";

import { signOut } from "@/app/api/login";
import { createSupabaseBrowserClient } from "@/app/lib/client/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const getUser = async () => {
    const user = await supabase.auth.getUser();
    if (user) {
      setUserName(user.data.user?.user_metadata.name);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    getUser();
  }, [userName]);
  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      {isLoggedIn && userName ? (
        <div>
          <p>{userName}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className=" w-[110px] h-[40px] rounded-[10px]  bg-main-blue text-white font-paper_logy text-[20px] hover:bg-main-light-blue  "
        >
          로그인
        </button>
      )}
    </header>
  );
}
