"use client";

import KakaoMap from "@/app/components/KakaoMap";
import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDatailData } from "@/app/hooks/useYapuPlaceData";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PlacePage() {
  const path = usePathname();
  const stadiumId = decodeURI(path).split("/")[2];
  const placename = decodeURI(path).split("/")[3];
  const router = useRouter();

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
          <>
            <div>{yapuPlaceDetailData[0].name}</div>
            <div>{yapuPlaceDetailData[0].location}</div>
            {!yapuPlaceDetailData[0].inside_stadium && (
              <KakaoMap place={yapuPlaceDetailData[0]} />
            )}
            {isMenuLoading ? (
              <div>loading...</div>
            ) : (
              <div>
                {recommendedMenusData.map((i) => (
                  <p key={i.menu_name}>
                    <span>{i.menu_name}</span>
                    <span>{i.price}</span>
                  </p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
