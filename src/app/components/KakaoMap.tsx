"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Database } from "../../../database.types";

type TypeYapuPlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function KakaoMap({ place }: { place: TypeYapuPlace }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      setIsLoaded(true);
      return;
    }

    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    kakao.maps.load(() => {
      // 지도 초기화
      const mapOption = {
        center: new kakao.maps.LatLng(place.lat!, place.lng!),
        level: 2,
      };
      const map = new kakao.maps.Map(mapRef.current!, mapOption);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: map.getCenter(),
      });
      marker.setMap(map);
    });
  }, [isLoaded, place]);

  return (
    <div>
      {isLoaded ? (
        <div ref={mapRef} className=" w-[50%] h-[200px]"></div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
