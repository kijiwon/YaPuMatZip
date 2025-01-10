"use client";

import "../../../globals.css";
import { useYapuPlaceBySearch } from "@/app/hooks/useYapuPlaceData";
import SearchResultListItem from "./SearchResultListItem";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const [isClickedBack, setIsClickedBack] = useState(false);
  const searchParams = useSearchParams();
  const [term, setTerm] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get("q") || sessionStorage.getItem("term");
    setTerm(query);
  }, [searchParams]);

  const { isPlaceLoading, yapuPlaceSearchlData } = useYapuPlaceBySearch(
    term as string
  );

  useEffect(() => {
    if (term) sessionStorage.setItem("term", term as string);
  }, [term]);

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      setIsClickedBack(true);
      sessionStorage.removeItem("term");
    };
    window.addEventListener("popstate", handlePopState);
    setIsClickedBack(false);
  }, [isClickedBack]);

  if (isPlaceLoading) return <div>로딩중...</div>;

  return (
    <div className="mt-[20px] w-[80%] flex flex-col items-center">
      <p className="w-[80%] flex flex-row  items-center  border-b-[1px] border-dashed  mb-[20px] pb-[10px] font-paper_logy text-[20px]">
        <BsFillSearchHeartFill size={22} />
        <span className="tracking-wider ml-[5px]">
          &ldquo;{term}&rdquo;에 대한 검색 결과
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
