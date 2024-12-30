"use client";

import "../../../globals.css";
import { useYapuPlaceBySearch } from "@/app/hooks/useYapuPlaceData";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const term = searchParams.get("q");
  const { isPlaceLoading, yapuPlaceSearchlData } = useYapuPlaceBySearch(
    term as string
  );

  if (isPlaceLoading) return <div>로딩중...</div>;
  if (yapuPlaceSearchlData.length === 0) {
    return <div>일치하는 결과가 없습니다.</div>;
  }

  return (
    <div>
      {yapuPlaceSearchlData.map((place) => (
        <div key={place.id}>{place.name}</div>
      ))}
    </div>
  );
}
