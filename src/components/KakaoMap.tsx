"use client";

import "./kakaomap.css";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Database } from "../../database.types";
import { StadiumType } from "@/types/stadium";

type TypeYapuPlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function KakaoMap({
  place,
  stadium,
}: {
  place: TypeYapuPlace;
  stadium: StadiumType;
}) {
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
        level: 4,
      };
      const map = new kakao.maps.Map(mapRef.current!, mapOption);

      // 위치
      const placePosition = new kakao.maps.LatLng(place.lat!, place.lng!);
      const stadiumPosition = new kakao.maps.LatLng(
        stadium.coordinates.lat!,
        stadium.coordinates.lng!
      );
      // 마커 생성
      const placeMarker = new kakao.maps.Marker({
        position: placePosition,
      });
      const stadiumMarker = new kakao.maps.Marker({
        position: stadiumPosition,
      });

      const placeContent = `<p class='info'>${place.name}</p>`;
      const placeOverlay = new kakao.maps.CustomOverlay({
        position: placePosition,
        content: placeContent,
      });

      const stadiumContent = `<p class='info'>${stadium.name}</p>`;
      const stadiumOverlay = new kakao.maps.CustomOverlay({
        position: stadiumPosition,
        content: stadiumContent,
      });

      stadiumMarker.setMap(map);
      placeMarker.setMap(map);
      stadiumOverlay.setMap(map);
      placeOverlay.setMap(map);
    });
  }, [
    isLoaded,
    place,
    stadium.coordinates.lat,
    stadium.coordinates.lng,
    stadium.name,
  ]);

  return (
    <div>
      {isLoaded ? (
        <div
          ref={mapRef}
          className="w-[80%] h-[320px] ml-auto mr-auto  border-2 rounded-md "
        ></div>
      ) : (
        <div className="w-[80%] h-[320px] ml-auto mr-auto bg-gray-200 rounded-md ">
          loading...
        </div>
      )}
    </div>
  );
}
