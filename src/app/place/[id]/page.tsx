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
    <div className=" h-[100vh] ">
      {stadium[0].name}
      {/* <div>
        <KakaoMap stadium={stadium[0]} />
      </div> */}
      <PlaceLists stadium={stadium[0]} />
    </div>
  );
}
