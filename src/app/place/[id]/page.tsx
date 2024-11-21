import KakaoMap from "@/app/components/KakaoMap";
import "../../globals.css";
import { StadiumType } from "@/types/stadium";
import StadiumData from "@/data/stadiums.json";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const stadium: StadiumType[] = StadiumData.filter((item) => item.id === id);

  return (
    <div className="h-[100vh] bg-red-300">
      {stadium[0].name}
      <div>
        <KakaoMap stadium={stadium[0]} />
      </div>
    </div>
  );
}
