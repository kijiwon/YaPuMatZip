"use client";

import "../../../globals.css";
import KakaoMap from "@/components/KakaoMap";
import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDatailData } from "@/app/hooks/useYapuPlaceData";
import { useStadiumStore } from "@/stores/stadium-store";
import { usePlaceStore } from "@/stores/place-store";
import BackButton from "@/components/BackButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlacePage() {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace, clearSelectedPlace } = usePlaceStore();
  const router = useRouter();
  const [isClickedBack, setIsClickedBack] = useState(false);
  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDatailData(
    selectedStadium?.id as string,
    selectedPlace as string
  );

  const { isMenuLoading, recommendedMenusData } = useRecommededMenusData(
    selectedPlace as string
  );

  const handleBackButton = () => {
    clearSelectedPlace();
    router.replace(`/stadium/${selectedStadium?.id}`);
  };

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      setIsClickedBack(true);
      clearSelectedPlace();
    };
    window.addEventListener("popstate", handlePopState);
  }, [isClickedBack]);

  return (
    <div className="w-[70%] mt-[20px]">
      <BackButton fn={handleBackButton} />
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
              {!yapuPlaceDetailData[0].inside_stadium && selectedStadium && (
                <KakaoMap
                  place={yapuPlaceDetailData[0]}
                  stadium={selectedStadium}
                />
              )}
            </section>
            <hr className="w-[100%] border-b-1 border-dashed border-gray-400 " />
            <section className="mt-[40px]">
              {isMenuLoading ? (
                <div>loading...</div>
              ) : (
                <div className=" flex flex-col items-center ">
                  <p className="text-center font-paper_logy text-[26px] mb-[20px]">
                    📋추천 메뉴
                  </p>
                  <ul className=" w-[70%] border-b-2  pt-[40px] pr-[20px] pl-[20px] pb-[20px] mb-[20px] rounded-lg text-[#3d211a] bg-[#fff2d2]">
                    {recommendedMenusData.map((i) => (
                      <li
                        key={i.menu_name}
                        className="border-b-[1px] border-dashed border-[#3d211a]  flex flex-col mb-[20px] pb-[5px] text-[18px] text-bold "
                      >
                        <span className="font-s_core">{i.menu_name}</span>
                        <span className="ml-auto mt-[10px] font-s_core">
                          {i.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
