"use client";

import { useRouter } from "next/navigation";
import { usePlaceStore } from "@/stores/place-store";
import { Database } from "../../../../../database.types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TypePlaceLike } from "@/types/PlaceLike";

type TypeYapuPlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function PlaceItem({
  place,
  stadium_id,
  likedPlace,
}: {
  place: TypeYapuPlace;
  stadium_id: string;
  likedPlace: TypePlaceLike[] | [];
}) {
  const router = useRouter();
  const { setSelectedPlace } = usePlaceStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleClickPlace = (place_name: string) => {
    setSelectedPlace(place_name as string);
    router.push(`/stadium/${stadium_id}/${place_name}`);
  };
  useEffect(() => {
    const isLikedPlace = likedPlace?.some((i) => i.place_name === place.name);
    setIsLiked(isLikedPlace);
  }, [likedPlace, place.name]);

  return (
    <li
      onClick={() => handleClickPlace(place.name)}
      className={`lg:w-[800px] cursor-pointer shadow-inner border-2 mb-[16px] py-[16px] rounded-[10px] pl-[26px] lg:pr-[20px] pr-[10px] flex flex-row justify-start items-center lg:text-[18px] text-[14px] font-s_core hover:shadow-lg`}
    >
      <p className="lg:text-[30px] text-[20px] lg:mr-[18px] mr-[10px]">
        {place.food_type}
      </p>
      <p className="font-s_core_bold">{place.name}</p>
      {place.is_delivery_or_takeout_available ? (
        <p className="lg:mx-[12px] mx-[6px] px-2 py-1 lg:p-[10px] rounded-lg bg-main-light-blue lg:text-[15px] text-[12px]  text-white">
          {place.is_delivery_or_takeout_available}
        </p>
      ) : null}
      <div className="ml-auto">
        {isLiked ? (
          <FaHeart color="pink" className="lg:text-[26px] text-[20px]" />
        ) : (
          <FaRegHeart className="lg:text-[26px] text-[20px]" />
        )}
      </div>
      <p className="lg:ml-[20px] ml-[10px] break-keep">
        {place.inside_stadium ? (
          <span className="bg-main-blue text-white lg:p-[10px] p-2 rounded-[10px]">
            구장안
          </span>
        ) : (
          <span className="bg-main-red text-white lg:p-[10px] p-2 rounded-[10px]">
            구장밖
          </span>
        )}
      </p>
    </li>
  );
}
