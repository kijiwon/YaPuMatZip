"use client";

import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PlacePage() {
  const path = usePathname();
  const placename = decodeURI(path).split("/")[3];

  const { isLoading, recommendedMenusData } = useRecommededMenusData(placename);
  const router = useRouter();

  if (!isLoading) console.log("//pagedata", recommendedMenusData);
  return (
    <div className="w-[70%] mt-[20px]">
      <button
        onClick={() => router.back()}
        className="flex flex-row items-center text-[18px] font-paper_logy"
      >
        <IoMdArrowRoundBack />
        뒤로가기
      </button>
      <div>
        <div>{placename}</div>
        {isLoading ? (
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
      </div>
    </div>
  );
}
