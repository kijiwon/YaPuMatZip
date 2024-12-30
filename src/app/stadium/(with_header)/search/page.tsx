"use client";

import "../../../globals.css";
import { useYapuPlaceBySearch } from "@/app/hooks/useYapuPlaceData";
import { useSearchParams } from "next/navigation";
import SearchResultListItem from "./SearchResultListItem";
import { BsFillSearchHeartFill } from "react-icons/bs";

export default function Search() {
  const searchParams = useSearchParams();
  const term = searchParams.get("q");
  const { isPlaceLoading, yapuPlaceSearchlData } = useYapuPlaceBySearch(
    term as string
  );

  if (isPlaceLoading) return <div>로딩중...</div>;

  return (
    <div className="mt-[20px] w-[80%] flex flex-col items-center">
      <p className="w-[80%] flex flex-row  items-center  border-b-[1px] border-dashed  mb-[20px] pb-[10px] font-paper_logy text-[20px]">
        <BsFillSearchHeartFill size={22} />
        <span className="tracking-wider ml-[5px]">
          "{term}"에 대한 검색 결과
        </span>
      </p>
      {yapuPlaceSearchlData.length === 0 ? (
        <p className="text-[20px] font-s_core tracking-wide">
          일치하는 장소가 없습니다😭
        </p>
      ) : (
        <ul className="flex flex-col justify-center">
          {yapuPlaceSearchlData?.map((place, idx) => (
            <SearchResultListItem key={idx} place={place} />
          ))}
        </ul>
      )}
    </div>
  );
}
