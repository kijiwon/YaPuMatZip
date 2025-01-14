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
      <div className="flex flex-col items-center">
        <p className="relative flex flex-row items-center text-[16px] font-paper_logy mr-[10px]">
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
          <div className="px-[20px] h-[100px] pt-[5px] bg-white  absolute mt-[30px] border-[1px] text-[16px] font-s_core z-40">
            <button
              onClick={onClickButton}
              className="border-b-[1px] border-dashed z-20"
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
