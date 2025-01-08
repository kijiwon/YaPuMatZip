"use client";

import { useYapuPlaceDetailData } from "@/app/hooks/useYapuPlaceData";
import { TypePlaceLike } from "@/types/PlaceLike";
import StadiumData from "@/data/stadiums.json";
import { useRouter } from "next/navigation";
import { useStadiumStore } from "@/stores/stadium-store";
import { usePlaceStore } from "@/stores/place-store";

export default function LikedPlaceListItem({ i }: { i: TypePlaceLike }) {
  const { setSelectedStadium } = useStadiumStore();
  const { setSelectedPlace } = usePlaceStore();
  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDetailData(
    i.stadium_id,
    i.place_name
  );
  const stadium = StadiumData.filter((st) => st.id === i.stadium_id);
  const router = useRouter();

  const onClickPlace = () => {
    setSelectedStadium(stadium[0]);
    setSelectedPlace(i.place_name);
    router.push(`/stadium/${i.stadium_id}/${i.place_name}`);
  };

  if (isPlaceLoading) return <div>로딩 중...</div>;
  return (
    <li
      onClick={onClickPlace}
      className="font-s_core mb-[16px] border-[2px] rounded-[10px]  p-3  cursor-pointer hover:shadow-lg"
    >
      {yapuPlaceDetailData.map((place) => (
        <div
          key={place.id}
          className=" flex flex-row justify-between items-center text-[18px]"
        >
          <p>
            <span className="mr-[10px]">{place.food_type}</span>
            {place.name}
          </p>
          <p>{stadium[0].name}</p>
        </div>
      ))}
    </li>
  );
}
