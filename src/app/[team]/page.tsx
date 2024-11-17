import KakaoMap from "../components/KakaoMap";
import "../globals.css";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Page() {
  return (
    <div className="h-[100vh] bg-red-300">
      team page
      <div className=" border-2">
        {/* <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "500px", height: "360px" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div className=" text-black">hello!</div>
          </MapMarker>
        </Map> */}
        <KakaoMap />
      </div>
    </div>
  );
}
