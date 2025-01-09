"use client";

import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDetailData } from "@/app/hooks/useYapuPlaceData";
import BackButton from "@/components/BackButton";
import KakaoMap from "@/components/KakaoMap";
import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useLikedPlaceController } from "@/app/hooks/useLikedPlaceController";

export default function PlaceInfo({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) {
  const [isClickedBack, setIsClickedBack] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace, clearSelectedPlace } = usePlaceStore();
  const { loading, likedPlace, onAddPlace, onRemovePlace } =
    useLikedPlaceController(userId);
  const hasHydrated = usePlaceStore.persist.hasHydrated();

  const router = useRouter();
  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDetailData(
    selectedStadium?.id as string,
    selectedPlace!
  );

  const { isMenuLoading, recommendedMenusData } = useRecommededMenusData(
    selectedPlace!
  );

  const handleBackButton = () => {
    clearSelectedPlace();
    // router.replace(`/stadium/${selectedStadium?.id}`);
    router.back();
  };

  const onClickAddLike = () => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요");
      return;
    }
    onAddPlace({
      id: userId,
      place_name: selectedPlace!,
      stadium_id: selectedStadium?.id as string,
    });
    setIsLiked(!isLiked);
  };

  const onClickRemoveLike = () => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요");
      return;
    }
    onRemovePlace({
      id: userId,
      place_name: selectedPlace!,
    });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (likedPlace?.find((i) => i.place_name === selectedPlace)) {
      setIsLiked(true);
    }
  }, [likedPlace]);

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      setIsClickedBack(true);
      clearSelectedPlace();
    };
    window.addEventListener("popstate", handlePopState);
    setIsClickedBack(false);
  }, [isClickedBack]);

  if (isPlaceLoading || isMenuLoading || loading) {
    return <div>loading...</div>;
  }

  if (!hasHydrated) return;

  return (
    <div>
      <BackButton fn={handleBackButton} />
      <div>
        {yapuPlaceDetailData[0] && (
          <div className="flex flex-col ">
            <section className="mb-[20px]">
              <div className="flex flex-row justify-center items-center">
                <h1 className="flex flex-row justify-center items-center font-paper_logy text-[32px] text-center">
                  <span className="mr-[5px]">
                    {yapuPlaceDetailData[0]?.food_type}
                  </span>
                  <span>{yapuPlaceDetailData[0]?.name}</span>
                </h1>
                <div>
                  {isLiked ? (
                    <FaHeart
                      onClick={onClickRemoveLike}
                      size={26}
                      color="pink"
                      className="ml-[10px] cursor-pointer"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={onClickAddLike}
                      size={26}
                      className="ml-[10px] cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <p className="font-s_core font-bold text-[18px] mt-[30px] mb-[10px] ml-[30px]">
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
    </div>
  );
}
