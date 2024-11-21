"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { StadiumType } from "@/types/stadium";
import { useState } from "react";

export default function KakaoMap({ stadium }: { stadium: StadiumType }) {
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
        center: new kakao.maps.LatLng(
          stadium.coordinates.lat,
          stadium.coordinates.lng
        ),
        level: 5,
      };
      const map = new kakao.maps.Map(mapRef.current!, mapOption);

      // 장소 검색
      const ps = new kakao.maps.services.Places(map);
      ps.categorySearch(
        "FD6",
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            data.forEach((place) => {
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(
                  Number(place.y),
                  Number(place.x)
                ),
                title: place.place_name,
                clickable: true,
              });

              const infowindow = new kakao.maps.InfoWindow({
                content: `<div>${place.place_name}</div>`,
                removable: true,
              });

              kakao.maps.event.addListener(marker, "click", () => {
                infowindow.open(map, marker);
              });
            });
          }
        },
        { useMapBounds: true }
      );
    });
  }, [isLoaded, stadium]);

  return (
    <div>
      {isLoaded ? (
        <div ref={mapRef} className=" w-[400px] h-[500px]"></div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
