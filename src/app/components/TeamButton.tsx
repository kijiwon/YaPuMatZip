"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  team_color: string;
  team: string;
  sub_team_color?: string;
  sub_team?: string;
  path: string;
  stadium: string;
}

export default function TeamButton({
  team_color,
  team,
  sub_team,
  sub_team_color,
  path,
  stadium,
}: Props) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onClickButton = () => {
    router.push(`/stadium/${path}`);
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
          className={` text-${team_color}-main  flex flex-row justify-center items-center text-center  text-[25px] drop-shadow-[0_8px_2px_rgba(0,0,0,0.2)]`}
        >
          <FaMapMarkerAlt />
          {stadium}
        </div>
      ) : (
        <>
          <span className={` text-${team_color}-main`}>{team}</span>
          {sub_team && (
            <>
              <span className="text-black">/</span>
              <span className={` text-${sub_team_color}-main`}>{sub_team}</span>
            </>
          )}
        </>
      )}
    </button>
  );
}
