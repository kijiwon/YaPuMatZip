// import KakaoMap from "@/app/components/KakaoMap";
import "../../globals.css";
import { StadiumType } from "@/types/stadium";
import StadiumData from "@/data/stadiums.json";
import PlaceLists from "@/app/components/PlaceLists";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const stadium: StadiumType[] = StadiumData.filter((item) => item.id === id);

  return (
    <div className=" w-full h-[100vh] flex flex-col items-center mt-[10px] ">
      <div className="w-[70%] font-kbo  mb-[30px]">
        <p
          className={` text-[26px] tracking-wider  text-${stadium[0].team_short_color[0]}-main`}
        >
          {stadium[0].teams[0]}
          {stadium[0].teams.length == 2 && (
            <>
              <span className="text-black">/</span>
              <span className={`text-${stadium[0].team_short_color[1]}-main`}>
                {stadium[0].teams[1]}
              </span>
            </>
          )}
        </p>
        <p className=" mt-[10px] text-[18px]">구장: {stadium[0].name}</p>
      </div>
      <PlaceLists stadium={stadium[0]} />
    </div>
  );
}
