"use client";

import { useStadiumStore } from "@/stores/stadium-store";
import Loading from "./loading";

export default function PlaceHeader() {
  const { selectedStadium } = useStadiumStore();

  if (!selectedStadium) {
    return <Loading />;
  }

  return (
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
  );
}
