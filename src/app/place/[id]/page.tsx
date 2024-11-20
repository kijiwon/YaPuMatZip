import KakaoMap from "@/app/components/KakaoMap";
import "../../globals.css";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="h-[100vh] bg-red-300">
      {id}
      <div>
        <KakaoMap id={id} />
      </div>
    </div>
  );
}
