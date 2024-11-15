import TeamButton from "./components/TeamButton";
import "./globals.css";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className=" relative  h-[100vh] flex flex-col items-center">
      <div className=" absolute inset-0 bg-ball-park opacity-70 sm:bg-cover lg:bg-center "></div>
      <header className=" relative flex flex-col justify-center items-center  text-white mt-[120px] mb-[130px]">
        <FaMapMarkedAlt
          size={58}
          className=" drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)] "
        />
        <h1 className="font-bold  font-kbo tracking-wider text-[60px] drop-shadow-[0_3px_2.0px_rgba(0,0,0,0.9)]">
          야구장
          <br />
          맛지도
        </h1>
      </header>
      <div className=" relative font-paper_logy grid grid-rows-2 gap-16 place-items-center">
        <div className=" grid grid-cols-4 gap-6">
          <TeamButton
            teamcolor="text-kia-red"
            team="kia"
            path="champions-field"
          />
          <TeamButton
            teamcolor=" text-samsung-blue"
            team="삼성"
            path="lions-park"
          />
          <TeamButton
            teamcolor=" text-lg-red"
            team="lg"
            sub_teamcolor="text-doosan-navy"
            sub_team="두산"
            path="seoul-baseball-stadium"
          />
          <TeamButton teamcolor=" text-red-600" team="KT" path="wiz-park" />
        </div>
        <div className=" grid grid-cols-5 gap-6">
          <TeamButton
            teamcolor=" text-ssg-red"
            team="ssg"
            path="landers-field"
          />
          <TeamButton
            teamcolor=" text-lotte-red"
            team="롯데"
            path="sajik-baseball-stadium"
          />
          <TeamButton
            teamcolor=" text-hanwha-orange"
            team="한화"
            path="baseball-dream-park"
          />
          <TeamButton teamcolor=" text-nc-blue" team="nc" path="nc-park" />
          <TeamButton
            teamcolor=" text-kiwoom-burgundy"
            team="키움"
            path="gocheok-sky-dome"
          />
        </div>
      </div>
    </div>
  );
}
