"use client";

import { useStadiumStore } from "@/stores/stadium-store";
import { StadiumType } from "@/types/stadium";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function TeamButton({ stadium }: { stadium: StadiumType }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedStadium } = useStadiumStore();

  const onClickButton = () => {
    setSelectedStadium(stadium);
    router.push(`/stadium/${stadium.id}`);
  };

  return (
    <button
      onClick={onClickButton}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`  text-[26px] rounded-lg w-[230px]  h-[84px] ${
        isHovered ? "  bg-[#f3f3f34a] " : "bg-white "
      } `}
    >
      {isHovered ? (
        <div
          className={` text-${stadium.team_short_color[0]}-main  flex flex-row justify-center items-center text-center  text-[25px] drop-shadow-[0_8px_2px_rgba(0,0,0,0.2)]`}
        >
          <FaMapMarkerAlt />
          {stadium.name}
        </div>
      ) : (
        <>
          <span className={` text-${stadium.team_short_color[0]}-main`}>
            {stadium.team_short[0]}
          </span>
          {stadium.teams.length === 2 && (
            <>
              <span className="text-black">/</span>
              <span className={` text-${stadium.team_short_color[1]}-main`}>
                {stadium.team_short[1]}
              </span>
            </>
          )}
        </>
      )}
    </button>
  );
}
