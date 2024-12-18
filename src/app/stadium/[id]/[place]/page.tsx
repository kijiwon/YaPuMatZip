"use client";

import "../../../globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import CommentsList from "@/components/CommentsList";
import { getComments } from "@/app/api/comments";
import PlaceInfo from "./PlaceInfo";

export default function PlacePage() {
  const commentRef = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const placename = decodeURI(path).split("/")[3];
  const [comment, setComment] = useState("");

  const handleGetComments = async (placename: string) => {
    try {
      const data = await getComments(placename);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (commentRef.current !== null) {
      // if (!loggedInUser) {
      //   alert("로그인 후 이용해주세요🙏");
      //   return;
      // }
    }
    setComment(e.target.value);
  };

  useEffect(() => {
    handleGetComments(placename);
  }, []);

  return (
    <div className="w-[70%] mt-[20px]">
      <PlaceInfo />
      <hr />
      <div className="mt-[20px]">
        <div className="flex flex-col">
          <p className="font-kbo text-[18px]">댓글</p>
          <div>
            <input
              className="border-2 rounded-sm w-[300px] mb-[20px]"
              ref={commentRef}
              type="text"
              value={comment}
              onChange={onChangeComment}
            />
            <button>제출</button>
          </div>
        </div>
        <CommentsList />
      </div>
    </div>
  );
}
