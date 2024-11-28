"use client";

import { StadiumType } from "@/types/stadium";
import { Database } from "../../database.types";
import { useRouter } from "next/navigation";

type TypeYapuPlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function PlaceItem({
  yapuPlaceData,
  stadium,
}: {
  yapuPlaceData: TypeYapuPlace[];
  stadium: StadiumType;
}) {
  const router = useRouter();
  const handleClickPlace = (place_name: string) => {
    router.push(`/stadium/${stadium.id}/${place_name}`);
  };

  return (
    <ul>
      {yapuPlaceData.map((i) => (
        <li
          onClick={() => handleClickPlace(i.name)}
          key={i.id}
          className={`w-[800px] cursor-pointer shadow-inner  border-2 mb-[16px] p-[16px] rounded-[10px] pl-[26px] pr-[20px] flex flex-row justify-start items-center text-[18px] font-s_core hover:shadow-lg`}
        >
          <p className="text-[30px] mr-[18px]">{i.food_type}</p>
          <p className="font-s_core_bold">{i.name}</p>
          {i.is_delivery_or_takeout_available ? (
            <p className=" mr-[10px] ml-[10px] rounded-lg bg-main-light-blue text-[15px] p-[5px] text-white">
              {i.is_delivery_or_takeout_available}
            </p>
          ) : null}

          <p className=" ml-auto ">
            {i.inside_stadium ? (
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
      ))}
    </ul>
  );
}
