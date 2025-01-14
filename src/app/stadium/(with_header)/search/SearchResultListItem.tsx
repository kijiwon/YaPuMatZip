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
    sessionStorage.removeItem("term");
  };

  return (
    <li
      onClick={onClickPlace}
      className="lg:w-[100%] grid grid-cols-5 cursor-pointer shadow-inner  border-2 mb-[16px] p-[16px] rounded-[10px] pl-[26px] lg:pr-[20px] pr-[10px] lg:text-[18px] text-[14px] font-s_core hover:shadow-lg"
    >
      <p
        className={`col-span-1 text-${stadium[0].team_short_color[0]}-main font-kbo`}
      >
        {stadium[0].team_short.length === 2
          ? `${stadium[0].team_short[0]}/${stadium[0].team_short[1]} `
          : stadium[0].team_short}
      </p>
      <p className="col-span-3">
        {place.food_type}
        {place.name}
      </p>
      <p className="col-span-1">{place.inside_stadium ? "구장안" : "구장밖"}</p>
    </li>
  );
}
