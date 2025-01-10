"use client";

import { useYapuPlaceBySearch } from "@/app/hooks/useYapuPlaceData";
import SearchResultListItem from "./SearchResultListItem";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Search({ q }: { q: string }) {
  const [isClickedBack, setIsClickedBack] = useState(false);
  const [term, setTerm] = useState<string>(
    q || sessionStorage.getItem("term") || ""
  );

  useEffect(() => {
    const query = q || sessionStorage.getItem("term") || "";
    setTerm(query);
  }, [q]);

  const { isPlaceLoading, yapuPlaceSearchlData } = useYapuPlaceBySearch(
    term as string
  );

  useEffect(() => {
    if (term) {
      sessionStorage.setItem("term", term);
    }
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

  if (isPlaceLoading) return <Loading />;

  return (
    <div className="w-[80%] flex flex-col items-center">
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
