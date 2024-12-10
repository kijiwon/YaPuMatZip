"use client";

import { signOut } from "@/app/api/login";
import { createSupabaseBrowserClient } from "@/app/utils/client/supabase";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const { loggedInUser, setLoggedInUser, clearLoggedInUser } = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const getUser = async () => {
    const user = await supabase.auth.getUser();
    if (user) {
      setLoggedInUser(user.data.user?.user_metadata.name);
      console.log(user.data.user);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    signOut();
    clearLoggedInUser();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    getUser();
  }, [router]);

  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      {isLoggedIn && loggedInUser ? (
        <div>
          <p>{loggedInUser}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button
          onClick={() => router.push("/auth")}
          className=" w-[110px] h-[40px] rounded-[10px]  bg-main-blue text-white font-paper_logy text-[20px] hover:bg-main-light-blue  "
        >
          로그인
        </button>
      )}
    </header>
  );
}
