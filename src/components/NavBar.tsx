"use client";

import StadiumData from "@/data/stadiums.json";
import { useStadiumStore } from "@/stores/stadium-store";
import { useParams, useRouter } from "next/navigation";

export default function NavBar() {
  const params = useParams();
  const router = useRouter();
  const { setSelectedStadium } = useStadiumStore();
  const filteredData = StadiumData.filter((i) => i.id !== params.id);

  return (
    <nav className=" flex flex-row justify-center items-end  h-[50px]  pb-[5px] font-paper_logy  border-b-[1.5px] border-gray-200">
      {filteredData.map((i) => (
        <button
          key={i.id}
          className=" w-[100px] mr-[20px] ml-[20px] text-[18px]"
          onClick={() => {
            setSelectedStadium(i);
            router.push(`/stadium/${i.id}`);
            sessionStorage.removeItem("term");
          }}
        >
          ⚾️
          <span className={` text-${i.team_short_color[0]}-main ml-[5px]`}>
            {i.team_short[0]}
          </span>
          {i.teams.length === 2 && (
            <>
              /
              <span className={` w-[100px] text-${i.team_short_color[1]}-main`}>
                {i.team_short[1]}
              </span>
            </>
          )}
        </button>
      ))}
    </nav>
  );
}
