"use client";

import { useLikedPlaceController } from "@/app/hooks/useLikedPlaceController";
import { useYapuPlaceData } from "../../../hooks/useYapuPlaceData";
import PlaceItem from "./PlaceItem";
import { useStadiumStore } from "@/stores/stadium-store";
import { ItemSkeleton } from "@/components/ItemSkeleton";
import { useEffect, useState } from "react";

export default function PlaceLists({ userId }: { userId: string }) {
  let stadium = null;
  const [foodCategory, setFoodCategory] = useState("all");

  if (typeof window !== "undefined") {
    stadium = JSON.parse(sessionStorage.getItem("stadium-storage")!);
  }

  const sessionStadiumId = stadium?.state?.selectedStadium.id;
  const { selectedStadium } = useStadiumStore();
  const stadium_id =
    (selectedStadium && selectedStadium.id) || sessionStadiumId;
  const { isLoading, yapuPlaceData } = useYapuPlaceData(stadium_id!);
  const { loading, likedPlace } = useLikedPlaceController(userId);

  const [filteredPlace, setFilteredPlace] = useState(yapuPlaceData);

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFoodCategory(e.target.value);
  };

  useEffect(() => {
    if (foodCategory === "all") {
      setFilteredPlace(yapuPlaceData);
    } else {
      const filteredData = yapuPlaceData.filter(
        (i) => i.category === foodCategory
      );
      setFilteredPlace(filteredData);
    }
  }, [foodCategory, yapuPlaceData]);

  if (!selectedStadium || loading || isLoading) {
    return (
      <div className="w-[70%] flex flex-col items-center">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div>
        <select onChange={onChangeCategory} defaultValue={"all"}>
          <option value="all">🍽️ 전체보기</option>
          <option value="KOR">🍚 한식(분식/육류 등)</option>
          <option value="JPN">🍣 일식(초밥/회/타코야끼 등)</option>
          <option value="CHN">🍤 중식(중회요리/크림새우 등)</option>
          <option value="WST">🍔 양식(피자/치킨/맥시칸 등)</option>
          <option value="DSR">🍦 디저트</option>
          <option value="BEV">🥤 음료</option>
        </select>
      </div>
      {selectedStadium?.id === "baseball-dream-park" ? (
        <div className="font-paper_logy text-center tracking-wider">
          <h1 className="text-[30px] text-main-red mb-[20px]">
            2025년 신구장 오픈 예정으로 데이터가 존재하지 않습니다.
          </h1>
          <p className=" text-[16px]  ">
            개막 후 빠르게 업데이트 할 예정이니 조금만 기다려 주세요🙏
          </p>
        </div>
      ) : (
        <>
          <ul>
            {filteredPlace.map((place) => (
              <PlaceItem
                key={place.id}
                place={place}
                stadium_id={selectedStadium.id}
                likedPlace={likedPlace}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
