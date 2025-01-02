"use client";

import { usePlaceStore } from "@/stores/place-store";
import { useRef, useState } from "react";
import { PiRobot } from "react-icons/pi";
import CommentListItem from "./CommentListItem";
import { useCommentsController } from "@/app/hooks/useCommentsController";
import { useStadiumStore } from "@/stores/stadium-store";

export default function PlaceComments({
  userEmail,
}: {
  userEmail: string | null;
}) {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace } = usePlaceStore();
  const commentRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const userName = userEmail?.split("@")[0] as string;
  const {
    loading,
    comments,
    onCreateComments,
    onEditComments,
    onDeleteComments,
  } = useCommentsController(selectedPlace!);

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
    if (selectedPlace && userEmail)
      onCreateComments({
        selectedPlace,
        content,
        userEmail,
        stadium_id: selectedStadium?.id as string,
      });
    setContent("");
  };

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
      {!loading && comments && (
        <ul className="mb-[20px] px-[50px]">
          {comments.map((i) => (
            <CommentListItem
              key={i.id}
              i={i}
              userEmail={userEmail!}
              onEditComments={onEditComments}
              onDeleteComments={onDeleteComments}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
