"use client";

import { useYapuPlaceDetailData } from "@/app/hooks/useYapuPlaceData";
import { TypePlaceLike } from "@/types/PlaceLike";
import StadiumData from "@/data/stadiums.json";

export default function LikedPlaceListItem({ i }: { i: TypePlaceLike }) {
  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDetailData(
    i.stadium_id,
    i.place_name
  );
  const stadium = StadiumData.filter((st) => st.id === i.stadium_id);
  if (isPlaceLoading) return <div>로딩 중...</div>;
  return (
    <li>
      {yapuPlaceDetailData.map((place) => (
        <p key={place.id}>
          {place.food_type}
          {place.name}
          {stadium[0].name}
        </p>
      ))}
    </li>
  );
}
