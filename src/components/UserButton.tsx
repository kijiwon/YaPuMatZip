"use client";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HeaderLogoutButton } from "./LoginButtons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserButton({ userName }: { userName: string }) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setIsClicked(!isClicked);
  };

  const onClickButton = () => {
    router.push(`/user/${userName}`);
    setIsClicked(false);
    sessionStorage.removeItem("term");
  };

  return (
    <div className="flex flex-row items-center">
      <div className="relative flex flex-col items-center">
        <p className="flex flex-row items-center text-[16px] font-paper_logy mr-[10px]">
          {userName}님
          {isClicked ? (
            <IoIosArrowUp
              onClick={handleOpen}
              size={16}
              className="cursor-pointer"
            />
          ) : (
            <IoIosArrowDown
              onClick={handleOpen}
              size={16}
              className="cursor-pointer"
            />
          )}
        </p>
        {isClicked && (
          <div className="z-50 lg:px-[10px] px-2 h-fit py-[10px] bg-white  absolute mt-[30px] border-[1px] lg:text-[16px] text-[14px] font-s_core">
            <button
              onClick={onClickButton}
              className="border-b-[1px] border-dashed"
            >
              마이페이지
            </button>
          </div>
        )}
      </div>
      <HeaderLogoutButton />
    </div>
  );
}
