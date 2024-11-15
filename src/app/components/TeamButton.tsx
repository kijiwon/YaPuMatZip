"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  teamcolor: string;
  team: string;
  sub_teamcolor?: string;
  sub_team?: string;
  path: string;
  stadium: string;
}

export default function TeamButton({
  teamcolor,
  team,
  sub_team,
  sub_teamcolor,
  path,
  stadium,
}: Props) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onClickButton = () => {
    router.push(`/${path}`);
  };

  return (
    <button
      onClick={onClickButton}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`  text-[26px] rounded-lg w-[220px]  h-[80px] ${
        isHovered ? "  bg-[#f3f3f378] " : "bg-white "
      } `}
    >
      {isHovered ? (
        <div
          className={`${teamcolor}  flex flex-row justify-center items-center  text-[23px] drop-shadow-[0_8px_2px_rgba(0,0,0,0.2)]`}
        >
          <FaMapMarkerAlt />
          {stadium}
        </div>
      ) : (
        <>
          <span className={`${teamcolor}`}>{team.toUpperCase()}</span>
          {sub_team && (
            <>
              <span className="text-black">/</span>
              <span className={`${sub_teamcolor}`}>
                {sub_team.toUpperCase()}
              </span>
            </>
          )}
        </>
      )}
    </button>
  );
}
