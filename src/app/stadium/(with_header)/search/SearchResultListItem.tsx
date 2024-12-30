"use client";

import { useRouter } from "next/navigation";
import { Database } from "../../../../../database.types";
import StadiumData from "@/data/stadiums.json";
import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";

type TypePlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function SearchResultListItem({ place }: { place: TypePlace }) {
  const stadium = StadiumData.filter((i) => i.id === place.stadium_id);
  const router = useRouter();
  const { setSelectedPlace } = usePlaceStore();
  const { setSelectedStadium } = useStadiumStore();

  const onClickPlace = () => {
    const url = `/stadium/${place.stadium_id}/${place.name}`;
    setSelectedStadium(stadium[0]);
    setSelectedPlace(place.name);
    router.push(url);
  };

  return (
    <li
      onClick={onClickPlace}
      className="w-[800px] grid grid-cols-6  cursor-pointer shadow-inner  border-2 mb-[16px] p-[16px] rounded-[10px] pl-[26px] pr-[20px] text-[18px] font-s_core hover:shadow-lg"
    >
      <p className={`text-${stadium[0].team_short_color[0]}-main font-kbo`}>
        {stadium[0].team_short.length === 2
          ? `${stadium[0].team_short[0]}/${stadium[0].team_short[1]} `
          : stadium[0].team_short}
      </p>
      <p className="col-span-4">
        {place.food_type}
        {place.name}
      </p>
      <p className="">{place.inside_stadium ? "구장안" : "구장밖"}</p>
    </li>
  );
}
