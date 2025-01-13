import TeamButton from "../components/TeamButton";
import "./globals.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import StadiumData from "@/data/stadiums.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "야푸 맛집",
  description: "구장 별 야푸 맛집을 만나보세요!",
  openGraph: {
    title: "야푸 맛집",
    description: "구장 별 야푸 맛집을 만나보세요!",
    images: ["/logo.png"],
  },
};

export default function Home() {
  const topTeam = StadiumData.slice(0, 4);
  const downTeam = StadiumData.slice(4);

  return (
    <div className=" relative  lg:h-screen flex flex-col items-center ">
      <div className=" absolute inset-0 bg-ball-park opacity-70 bg-cover"></div>
      <header className=" relative flex flex-col justify-center items-center text-white lg:mt-[120px] lg:mb-[130px] mt-[100px] mb-[80px]">
        <FaMapMarkedAlt
          size={60}
          className="drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)] "
        />
        <h1 className="font-bold text-center font-kbo tracking-wider lg:text-[62px] text-[40px]  drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)]">
          야구푸드
          <br />
          맛ZIP
        </h1>
      </header>
      <div className=" relative font-paper_logy grid lg:grid-rows-2 lg:gap-16 grid-rows-2 gap-2 place-items-center">
        <div className=" grid lg:grid-cols-4 lg:gap-16 grid-cols-2 gap-4">
          {topTeam.map((i) => (
            <TeamButton key={i.id} stadium={i} />
          ))}
        </div>
        <div className=" grid lg:grid-cols-5 lg:gap-16 grid-cols-2 gap-4">
          {downTeam.map((i) => (
            <TeamButton key={i.id} stadium={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
