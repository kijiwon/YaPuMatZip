"use client";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function KakaoMap() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    document.body.appendChild(script);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer: HTMLElement = document.getElementById("map")!;
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.3, 127.01), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const ps = new kakao.maps.services.Places(map);

        ps.categorySearch(
          "FD6",
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              console.log(data);

              for (let i = 0; i < data.length; i++) {
                const marker = new kakao.maps.Marker({
                  map: map,
                  position: new kakao.maps.LatLng(
                    Number(data[i].y),
                    Number(data[i].x)
                  ),
                  title: data[i].place_name,
                  clickable: true,
                });

                const iwContent = `<div>${marker.getTitle()}</div>`;

                const infowindow = new kakao.maps.InfoWindow({
                  position: marker.getPosition(),
                  content: iwContent,
                  removable: true,
                });
                kakao.maps.event.addListener(marker, "click", () => {
                  infowindow.open(map, marker);
                });
              }
            }
          },
          { useMapBounds: true }
        );
      });
    };
    script.addEventListener("load", () => {
      onLoadKakaoMap();
      setIsLoading(true);
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        <div ref={mapRef} id="map" className=" w-full h-[500px]"></div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
