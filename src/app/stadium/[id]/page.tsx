"use client";

import "../../globals.css";
import { useStadiumStore } from "@/stores/stadium-store";
import PlaceLists from "@/components/PlaceLists";
import { usePlaceStore } from "@/stores/place-store";

export default function Page() {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace } = usePlaceStore();
  console.log(">>id page", selectedPlace);
  return (
    <div className=" mt-[20px]">
      <div className="w-[70%] font-kbo mb-[30px]">
        <p
          className={` text-[26px] tracking-wider text-${selectedStadium?.team_short_color[0]}-main`}
        >
          {selectedStadium?.teams[0]}
          {selectedStadium?.teams.length == 2 && (
            <>
              <span className="text-black">/</span>
              <span
                className={`text-${selectedStadium?.team_short_color[1]}-main`}
              >
                {selectedStadium?.teams[1]}
              </span>
            </>
          )}
        </p>
        <p className=" mt-[10px] text-[18px]">구장: {selectedStadium?.name}</p>
      </div>
      {selectedStadium?.id === "baseball-dream-park" ? (
        <div className=" font-paper_logy text-center tracking-wider">
          <h1 className=" text-[30px] text-main-red mb-[20px]">
            2025년 신구장 오픈 예정으로 데이터가 존재하지 않습니다.
          </h1>
          <p className=" text-[16px]  ">
            개막 후 빠르게 업데이트 할 예정이니 조금만 기다려 주세요🙏
          </p>
        </div>
      ) : (
        <PlaceLists stadium={selectedStadium!} />
      )}
    </div>
  );
}
