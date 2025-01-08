"use client";

import LikedPlaceListItem from "./LikedPlaceListItem";
import { useLikedPlacePagination } from "@/app/hooks/useLikedPlaceController";

export default function LikedPlaceList({ userId }: { userId: string }) {
  const { loading, likedPlace, total, page, pageSize, setPage } =
    useLikedPlacePagination(userId);
  const totalPages = Math.ceil(total / pageSize); // 총 페이지 수

  if (loading) return <div>로딩중...</div>;
  if (!likedPlace || likedPlace.length === 0) return <div>no data</div>;

  return (
    <>
      <ul className="min-h-[80%] flex flex-col pt-[20px]">
        {likedPlace.map((i, idx) => (
          <LikedPlaceListItem key={idx} i={i} />
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button key={idx} onClick={() => setPage(idx + 1)}>
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}
