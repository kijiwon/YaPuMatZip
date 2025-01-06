"use client";

import { TypePlaceLike } from "@/types/PlaceLike";
import { useYapuPlaceData } from "../../../hooks/useYapuPlaceData";
import PlaceItem from "./PlaceItem";
import { useStadiumStore } from "@/stores/stadium-store";

export default function PlaceLists(likedPlace: TypePlaceLike | []) {
  const stadium = JSON.parse(sessionStorage.getItem("stadium-storage")!);
  const sessionStadiumId = stadium.state.selectedStadium.id;
  const { selectedStadium } = useStadiumStore();
  const stadium_id =
    (selectedStadium && selectedStadium.id) || sessionStadiumId;
  const { isLoading, yapuPlaceData } = useYapuPlaceData(stadium_id!);

  if (!selectedStadium) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      {selectedStadium?.id === "baseball-dream-park" ? (
        <div className=" font-paper_logy text-center tracking-wider">
          <h1 className=" text-[30px] text-main-red mb-[20px]">
            2025년 신구장 오픈 예정으로 데이터가 존재하지 않습니다.
          </h1>
          <p className=" text-[16px]  ">
            개막 후 빠르게 업데이트 할 예정이니 조금만 기다려 주세요🙏
          </p>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {yapuPlaceData.map((place) => (
                <PlaceItem
                  key={place.id}
                  place={place}
                  stadium_id={selectedStadium.id}
                  likedPlace={likedPlace.likedPlace}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
