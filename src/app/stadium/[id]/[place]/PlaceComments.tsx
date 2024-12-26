"use client";

import { createComments, getComments } from "@/app/comment/actions";
import { usePlaceStore } from "@/stores/place-store";
import { useEffect, useRef, useState } from "react";
import { PiRobot } from "react-icons/pi";
import { Database } from "../../../../../database.types";

type TypeComments = Database["public"]["Tables"]["comments"]["Row"];

export default function PlaceComments({
  userEmail,
}: {
  userEmail: string | null;
}) {
  const { selectedPlace } = usePlaceStore();
  const commentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const userName = userEmail?.split("@")[0] as string;
  const [commentList, setCommentList] = useState<TypeComments[]>([]);

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (commentRef.current !== null) {
      if (!userEmail) {
        alert("로그인 후 이용해주세요🙏");
        return;
      }
    }
    setContent(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length === 0) {
      alert("한 글자 이상 작성해주세요");
      return;
    }
    createComments({
      place: selectedPlace!,
      content: content,
      user_email: userEmail!,
    });
    setContent("");
    handleGetComments();
  };

  const handleGetComments = async () => {
    const commentData = await getComments(selectedPlace!);
    console.log(commentData);
    if (commentData) setCommentList(commentData);
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="mt-[20px]">
      <div className="flex flex-col">
        <p className="font-kbo text-[18px]">댓글</p>
        <form
          onSubmit={onSubmit}
          className="flex flex-row items-center justify-center mt-[10px]  mb-[40px] font-s_core"
        >
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
            value={content}
            onChange={onChangeComment}
          />
          <button
            type="submit"
            className=" py-[5px] px-[14px] bg-slate-200 rounded-md font-bold "
          >
            제출
          </button>
        </form>
      </div>
      {commentList && (
        <ul className="mb-[20px] px-[80px]">
          {commentList.map((i) => (
            <li
              key={i.id}
              className="flex flex-row items-start font-s_core border-b-[2px]"
            >
              <p className="w-[180px] flex flex-row  items-center text-[18px] mr-[10px] pt-[5px] pl-[5px]">
                <PiRobot size={22} />
                <span>{i.user_email.split("@")[0]}</span>
              </p>
              <div className=" border-l-[2px] border-dashed text-[16px] pl-[5px]">
                <p>{i.content}</p>
                <p className="text-[13px] text-gray-500">{i.created_at}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
