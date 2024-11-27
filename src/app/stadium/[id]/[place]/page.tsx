"use client";

import "../../../globals.css";
import KakaoMap from "@/app/components/KakaoMap";
import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDatailData } from "@/app/hooks/useYapuPlaceData";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import stadiums from "@/data/stadiums.json";

export default function PlacePage() {
  const path = usePathname();
  const stadiumId = decodeURI(path).split("/")[2];
  const placename = decodeURI(path).split("/")[3];
  const router = useRouter();

  const stadiumData = stadiums.filter((i) => i.id === stadiumId);

  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDatailData(
    stadiumId,
    placename
  );
  const { isMenuLoading, recommendedMenusData } =
    useRecommededMenusData(placename);

  return (
    <div className="w-[70%] mt-[20px]">
      <button
        onClick={() => router.back()}
        className="flex flex-row items-center mb-[30px] text-[18px] font-paper_logy"
      >
        <IoMdArrowRoundBack />
        뒤로가기
      </button>
      <div>
        {isPlaceLoading ? (
          <div>loading...</div>
        ) : (
          <div className="flex flex-col">
            <section className="mb-[30px]">
              <div>
                <h1 className="flex flex-row justify-center items-center font-paper_logy text-[32px] text-center">
                  <span className="mr-[5px]">
                    {yapuPlaceDetailData[0].food_type}
                  </span>
                  <span>{yapuPlaceDetailData[0].name}</span>
                </h1>
              </div>
              <p className="font-s_core font-bold text-[18px] mt-[30px] mb-[10px]">
                위치 : {yapuPlaceDetailData[0].location}
              </p>
              <p className="font-s_core flex text-[18px] flex-row items-center mb-[10px]">
                <span className="mr-[20px]">
                  {yapuPlaceDetailData[0].is_delivery_or_takeout_available}
                </span>
                <span>{yapuPlaceDetailData[0].info}</span>
              </p>
              {!yapuPlaceDetailData[0].inside_stadium && (
                <KakaoMap
                  place={yapuPlaceDetailData[0]}
                  stadium={stadiumData[0]}
                />
              )}
            </section>
            <hr className="w-[100%] border-b-1 border-dashed border-gray-400 " />
            <section className="mt-[40px]">
              {isMenuLoading ? (
                <div>loading...</div>
              ) : (
                <div className=" flex flex-col ">
                  <p className="text-[20px] text-center">📋추천 메뉴</p>
                  {recommendedMenusData.map((i) => (
                    <p key={i.menu_name} className=" flex flex-col">
                      <span>{i.menu_name}</span>
                      <span className="ml-auto">{i.price}</span>
                    </p>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
