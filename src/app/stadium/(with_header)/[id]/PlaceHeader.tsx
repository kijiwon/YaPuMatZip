"use client";

import { useStadiumStore } from "@/stores/stadium-store";
import Loading from "./loading";
import { MdDeliveryDining } from "react-icons/md";

export default function PlaceHeader() {
  const { selectedStadium } = useStadiumStore();

  if (!selectedStadium) {
    return <Loading />;
  }

  return (
    <div className="lg:w-[800px] font-kbo mb-[6px] flex lg:flex-row flex-col lg:justify-between border-b-2 border-dashed">
      <div>
        <p
          className={`lg:text-[26px] text-[20px] tracking-wider text-${selectedStadium?.team_short_color[0]}-main`}
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
        <p className="mt-[10px] lg:text-[18px] text-[14px] mb-[6px]">
          구장: {selectedStadium?.name}
        </p>
      </div>

      {selectedStadium.tips?.map((tip, idx) => (
        <div
          key={idx}
          className="h-full font-roboto lg:text-[14px] text-[12px] lg:border-l-2 lg:pl-3 mt-[4px] lg:self-end"
        >
          {tip.tip && (
            <div>
              <span className="text-main-red font-paper_logy mb-[4px] mr-[6px] lg:text-[16px]">
                TIP!
              </span>
              <span>{tip.tip}</span>
            </div>
          )}
          <div className="mb-[6px]">
            <div className="flex flex-row items-center">
              <MdDeliveryDining className="text-[14px] lg:text-[20px]" />
              <span className="font-paper_logy tracking-wider">배달ZONE</span>
            </div>
            {tip.delivery_zone?.map((i, idx) => <p key={idx}>{i}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}
