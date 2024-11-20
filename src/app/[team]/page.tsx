import KakaoMap from "../components/KakaoMap";
import "../globals.css";

export default function Page() {
  return (
    <div className="h-[100vh] bg-red-300">
      team page
      <div className=" border-2">
        <KakaoMap />
      </div>
    </div>
  );
}
