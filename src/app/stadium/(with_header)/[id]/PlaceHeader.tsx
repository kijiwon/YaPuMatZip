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
    <div className="lg:w-[800px] font-kbo mb-[30px] flex lg:flex-row flex-col lg:justify-between">
      <div>
        <p
          className={`lg:text-[26px] text-[24px] tracking-wider text-${selectedStadium?.team_short_color[0]}-main`}
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
        <p className="mt-[10px] lg:text-[18px] text-[16px]">
          구장: {selectedStadium?.name}
        </p>
      </div>

      {selectedStadium.tips?.map((tip, idx) => (
        <div
          key={idx}
          className="h-fit font-roboto text-[14px] border-2 rounded-md py-2 px-4 border-main-blue border-dashed"
        >
          {tip.tip && (
            <div>
              <span className="text-main-red font-paper_logy mb-[4px] mr-[6px] text-[16px]">
                TIP!
              </span>
              <span>{tip.tip}</span>
            </div>
          )}
          <div>
            <div className="flex flex-row items-center">
              <MdDeliveryDining size={20} />
              <span className="font-paper_logy tracking-wider">배달ZONE</span>
            </div>
            {tip.delivery_zone?.map((i, idx) => <p key={idx}>{i}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}
