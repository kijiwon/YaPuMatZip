"use client";

import LikedPlaceListItem from "./LikedPlaceListItem";
import { useLikedPlacePagination } from "@/app/hooks/useLikedPlaceController";

export default function LikedPlaceList({ userId }: { userId: string }) {
  const { loading, likedPlace, total, page, pageSize, setPage } =
    useLikedPlacePagination(userId);
  const totalPages = Math.ceil(total / pageSize); // 총 페이지 수

  if (loading)
    return (
      <div className="mt-[20px] border-[2px] rounded-[10px]  p-3 text-[18px]">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if (!loading && likedPlace.length === 0)
    return (
      <div className="mt-[20px] font-s_core lg:text-[18px] text-[16px]">
        아직 좋아요를 누른 장소가 없어요!
      </div>
    );

  return (
    <>
      <ul className="lg:min-h-[80%] flex flex-col pt-[20px]">
        {likedPlace.map((i, idx) => (
          <LikedPlaceListItem key={idx} i={i} />
        ))}
      </ul>
      <div className="flex flex-row items-center justify-center font-paper_logy text-[14px]">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`text-white py-2 px-4 rounded-md ${
              page === idx + 1 ? " bg-main-blue" : "bg-gray-200"
            } hover:bg-main-blue`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}
