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
      className={`w-[800px] cursor-pointer shadow-inner  border-2 mb-[16px] p-[16px] rounded-[10px] pl-[26px] pr-[20px] flex flex-row justify-start items-center text-[18px] font-s_core hover:shadow-lg`}
    >
      <p className="text-[30px] mr-[18px]">{place.food_type}</p>
      <p className="font-s_core_bold">{place.name}</p>
      {place.is_delivery_or_takeout_available ? (
        <p className=" mr-[10px] ml-[10px] rounded-lg bg-main-light-blue text-[15px] p-[5px] text-white">
          {place.is_delivery_or_takeout_available}
        </p>
      ) : null}
      <div className="ml-auto text-[22px]">
        {isLiked ? (
          <FaHeart size={26} color="pink" />
        ) : (
          <FaRegHeart size={26} />
        )}
      </div>
      <p className=" ml-[20px] ">
        {place.inside_stadium ? (
          <span className="bg-main-blue text-white p-[10px] rounded-[10px]">
            구장안
          </span>
        ) : (
          <span className="bg-main-red text-white p-[10px] rounded-[10px]">
            구장밖
          </span>
        )}
      </p>
    </li>
  );
}
