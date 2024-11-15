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
          <TeamButton textcolor="text-kia-red" text="kia" />
          <TeamButton textcolor=" text-samsung-blue" text="삼성" />
          <TeamButton
            textcolor=" text-lg-red"
            text="lg"
            sub_textcolor="text-doosan-navy"
            sub_text="두산"
          />
          <TeamButton textcolor=" text-red-600" text="KT" />
        </div>
        <div className=" grid grid-cols-5 gap-6">
          <TeamButton textcolor=" text-ssg-red" text="ssg" />
          <TeamButton textcolor=" text-lotte-red" text="롯데" />
          <TeamButton textcolor=" text-hanwha-orange" text="한화" />
          <TeamButton textcolor=" text-nc-blue" text="nc" />
          <TeamButton textcolor=" text-kiwoom-burgundy" text="키움" />
        </div>
      </div>
    </div>
  );
}
