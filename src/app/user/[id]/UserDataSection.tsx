"use client";

import { useState } from "react";
import LikedPlaceList from "./(liked-place)/LikedPlaceList";
import UserCommentList from "./(user-comments)/UserCommentList";
import { TypePlaceLike } from "@/types/PlaceLike";

export default function UserDataSection({
  userId,
  likedPlace,
}: {
  userId: string;
  likedPlace: TypePlaceLike[] | [];
}) {
  const [isCommentsView, setIsCommentsView] = useState(true);
  const [isLikedPlaceView, setIsLikedPlaceView] = useState(false);

  const showComments = () => {
    setIsCommentsView(true);
    setIsLikedPlaceView(false);
  };

  const showLikedPlace = () => {
    setIsLikedPlaceView(true);
    setIsCommentsView(false);
  };

  return (
    <section>
      <div className=" flex flex-row items-center justify-end border-b-[2px] border-dashed border-main-blue">
        <p
          onClick={showComments}
          className="w-fit ml-[10px] border-[2px] border-b-0 rounded-t-lg border-main-blue  py-[4px] px-[8px]"
        >
          Comments
        </p>
        <p
          onClick={showLikedPlace}
          className="w-fit ml-[10px] border-[2px] border-b-0 rounded-t-lg border-main-blue  py-[4px] px-[8px]"
        >
          Liked-Place
        </p>
      </div>
      {isCommentsView && <UserCommentList user_id={userId} />}
      {isLikedPlaceView && <LikedPlaceList likedPlace={likedPlace} />}
    </section>
  );
}
