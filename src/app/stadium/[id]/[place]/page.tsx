"use client";

import "../../../globals.css";
import KakaoMap from "@/components/KakaoMap";
import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDatailData } from "@/app/hooks/useYapuPlaceData";
import { useStadiumStore } from "@/stores/stadium-store";
import { usePlaceStore } from "@/stores/place-store";
import BackButton from "@/components/BackButton";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { useRef } from "react";
import CommentsList from "@/components/CommentsList";

export default function PlacePage() {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace, clearSelectedPlace } = usePlaceStore();
  const { loggedInUser } = useUserStore();

  const commentRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isClickedBack, setIsClickedBack] = useState(false);
  const path = usePathname();
  const stadiumId = decodeURI(path).split("/")[2];
  const placename = decodeURI(path).split("/")[3];
  const [comment, setComment] = useState("");

  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDatailData(
    selectedStadium?.id! || stadiumId,
    selectedPlace! || placename
  );

  const { isMenuLoading, recommendedMenusData } = useRecommededMenusData(
    selectedPlace! || placename
  );

  const handleBackButton = () => {
    clearSelectedPlace();
    router.replace(`/stadium/${selectedStadium?.id}`);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (commentRef.current !== null) {
      if (!loggedInUser) {
        alert("로그인 후 이용해주세요🙏");
        return;
      }
    }
    setComment(e.target.value);
  };

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      console.log("뒤로가기 감지");
      setIsClickedBack(true);
      clearSelectedPlace();
    };
    window.addEventListener("popstate", handlePopState);
    setIsClickedBack(false);
  }, [isClickedBack]);

  if (isPlaceLoading || isMenuLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-[70%] mt-[20px]">
      <BackButton fn={handleBackButton} />
      <div>
        {yapuPlaceDetailData[0] && (
          <div className="flex flex-col">
            <section className="mb-[20px]">
              <div>
                <h1 className="flex flex-row justify-center items-center font-paper_logy text-[32px] text-center">
                  <span className="mr-[5px]">
                    {yapuPlaceDetailData[0]?.food_type}
                  </span>
                  <span>{yapuPlaceDetailData[0]?.name}</span>
                </h1>
              </div>
              <p className="font-s_core font-bold text-[18px] mt-[30px] mb-[10px]">
                위치 : {yapuPlaceDetailData[0]?.location}
              </p>
              <p className="font-s_core flex text-[18px] flex-row items-center mb-[10px]">
                <span className="mr-[20px]">
                  {yapuPlaceDetailData[0]?.is_delivery_or_takeout_available}
                </span>
                <span>{yapuPlaceDetailData[0]?.info}</span>
              </p>
              {!yapuPlaceDetailData[0]?.inside_stadium &&
                selectedStadium &&
                yapuPlaceDetailData[0] && (
                  <KakaoMap
                    place={yapuPlaceDetailData[0]!}
                    stadium={selectedStadium!}
                  />
                )}
            </section>
            <hr className="w-[100%] border-b-1 border-dashed border-gray-400 " />
            <section className="mt-[40px]">
              {!isMenuLoading && (
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
      <hr />
      <div className="mt-[20px]">
        <div className="flex flex-col">
          <p className="font-kbo text-[18px]">댓글</p>
          <div>
            <input
              className="border-2 rounded-sm w-[300px] mb-[20px]"
              ref={commentRef}
              type="text"
              value={comment}
              onChange={onChangeComment}
            />
            <button>제출</button>
          </div>
        </div>
        <CommentsList />
      </div>
    </div>
  );
}
