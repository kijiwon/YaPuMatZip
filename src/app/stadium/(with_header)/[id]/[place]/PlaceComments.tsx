"use client";

import { usePlaceStore } from "@/stores/place-store";
import { useRef, useState } from "react";
import { PiRobot } from "react-icons/pi";
import CommentListItem from "./CommentListItem";
import { useCommentsController } from "@/app/hooks/useCommentsController";
import { useStadiumStore } from "@/stores/stadium-store";
import { FaRegCommentAlt } from "react-icons/fa";

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
    <div className="w-[90%] mt-[20px]">
      <div className="flex flex-col">
        <p className="font-kbo lg:text-[24px] text-[18px] flex flex-row items-center">
          댓글
          <FaRegCommentAlt className="lg:text-[22px] text-[20px] mb-[20px] ml-[3px]" />
        </p>
        <form
          onSubmit={onSubmit}
          className="flex flex-row items-center justify-center mt-[10px] mb-[40px] font-kyobo"
        >
          <p className="flex flex-row items-center lg:text-[18px] text-[14px]">
            {userName && (
              <>
                <PiRobot />
                {userName}
              </>
            )}
          </p>
          <input
            className="border-b-2 rounded-sm w-[60%] mx-[15px] pl-[5px] focus:outline-none lg:text-[16px] text-[14px]"
            ref={commentRef}
            type="text"
            value={content}
            onChange={onChangeComment}
          />
          <button
            type="submit"
            className="lg:py-[5px] lg:px-[14px] py-1 px-3 bg-slate-200 rounded-md font-bold "
          >
            등록
          </button>
        </form>
      </div>
      {!loading && comments && (
        <div className="flex flex-col items-center">
          <p className="w-full flex flex-row items-center py-1 pl-[10px] bg-main-blue text-white rounded-lg">
            <FaRegCommentAlt />
            <span className="ml-[4px] font-kyobo">{comments.length}개</span>
          </p>
          <ul className="w-full mb-[20px]">
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
        </div>
      )}
    </div>
  );
}
