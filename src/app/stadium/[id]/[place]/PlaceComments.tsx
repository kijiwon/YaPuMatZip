"use client";

import CommentsList from "@/components/CommentsList";
import { useRef, useState } from "react";
import { PiRobot } from "react-icons/pi";

export default function PlaceComments({ userName }: { userName: string }) {
  const commentRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState("");

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (commentRef.current !== null) {
      if (!userName) {
        alert("로그인 후 이용해주세요🙏");
        return;
      }
    }
    setComment(e.target.value);
  };

  return (
    <div className="mt-[20px]">
      <div className="flex flex-col">
        <p className="font-kbo text-[18px]">댓글</p>
        <div className="flex flex-row items-center justify-center mt-[10px]  mb-[40px] font-s_core">
          <p className="flex flex-row items-center text-[18px] ">
            {userName && (
              <>
                <PiRobot />
                {userName}
              </>
            )}
          </p>
          <input
            className="border-b-2 rounded-sm w-[60%] mx-[15px] pl-[5px] focus:outline-none text-[16px]"
            ref={commentRef}
            type="text"
            value={comment}
            onChange={onChangeComment}
          />
          <button className=" py-[5px] px-[14px] bg-slate-200 rounded-md font-bold ">
            제출
          </button>
        </div>
      </div>
      <CommentsList />
    </div>
  );
}
