import TeamButton from "../components/TeamButton";
import "./globals.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import StadiumData from "@/data/stadiums.json";

export default function Home() {
  const topTeam = StadiumData.slice(0, 4);
  const downTeam = StadiumData.slice(4);

  return (
    <div className=" relative  h-[100vh] flex flex-col items-center">
      <div className=" absolute inset-0 bg-ball-park opacity-70 sm:bg-cover lg:bg-center "></div>
      <header className=" relative flex flex-col justify-center items-center  text-white mt-[120px] mb-[130px]">
        <FaMapMarkedAlt
          size={60}
          className=" drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)] "
        />
        <h1 className="font-bold text-center  font-kbo tracking-wider text-[62px] drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)]">
          야구푸드
          <br />
          맛ZIP
        </h1>
      </header>
      <div className=" relative font-paper_logy grid grid-rows-2 gap-16 place-items-center">
        <div className=" grid grid-cols-4 gap-16">
          {topTeam.map((i) => (
            <TeamButton key={i.id} stadium={i} />
          ))}
        </div>
        <div className=" grid grid-cols-5 gap-16">
          {downTeam.map((i) => (
            <TeamButton key={i.id} stadium={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
