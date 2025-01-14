"use client";

import StadiumData from "@/data/stadiums.json";
import { useStadiumStore } from "@/stores/stadium-store";
import { useParams, useRouter } from "next/navigation";
import { TbBuildingStadium } from "react-icons/tb";
import SearchBar from "./SearchBar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";

export default function NavBar() {
  const params = useParams();
  const router = useRouter();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { setSelectedStadium } = useStadiumStore();

  const filteredData = StadiumData.filter((i) => i.id !== params.id);

  const handleOpenSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  return (
    <>
      <nav className="hidden lg:flex flex-row justify-center items-end  h-[50px]  pb-[5px] font-kbo  border-b-[1.5px] border-gray-200">
        {filteredData.map((i) => (
          <button
            key={i.id}
            className=" w-[100px] mx-[20px] text-[18px]"
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
                <span
                  className={` w-[100px] text-${i.team_short_color[1]}-main`}
                >
                  {i.team_short[1]}
                </span>
              </>
            )}
          </button>
        ))}
      </nav>
      <div className="lg:hidden">
        <nav className="fixed w-[100%] mt-[90px] flex flex-row items-center justify-center bg-white">
          <TbBuildingStadium
            size={30}
            onClick={handleOpenSideBar}
            className="-ml-[25px] mr-[15px] cursor-pointer"
          />
          <SearchBar />
        </nav>
        {/* sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 w-50 h-screen px-5 py-10 overflow-y-auto transition-transform ${
            isOpenSideBar ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r-[2px]`}
        >
          <IoMdArrowRoundBack
            size={30}
            onClick={handleOpenSideBar}
            className="cursor-pointer"
          />
          <div className="flex flex-col items-start mt-[30px] font-kbo gap-6">
            {filteredData.map((i) => (
              <button
                key={i.id}
                className="text-[20px]"
                onClick={() => {
                  setSelectedStadium(i);
                  setIsOpenSideBar(false);
                  router.push(`/stadium/${i.id}`);
                  sessionStorage.removeItem("term");
                }}
              >
                ⚾️
                <span className={`text-${i.team_short_color[0]}-main ml-[5px]`}>
                  {i.team_short[0]}
                </span>
                {i.teams.length === 2 && (
                  <>
                    /
                    <span
                      className={`w-[100px] text-${i.team_short_color[1]}-main`}
                    >
                      {i.team_short[1]}
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
