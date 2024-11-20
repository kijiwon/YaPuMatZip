"use client";

import { useRef } from "react";
import { useEffect } from "react";
import { useBallparkData } from "../hooks/useBallparkData";

export default function KakaoMap({ id }: { id: string }) {
  const mapRef = useRef(null);
  const { isLoading, ballparkData } = useBallparkData(id);

  useEffect(() => {
    if (ballparkData[0]) {
      const script: HTMLScriptElement = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
      document.body.appendChild(script);
      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          const mapContainer: HTMLElement = document.getElementById("map")!;
          const mapOption = {
            center: new window.kakao.maps.LatLng(
              ballparkData[0].lat,
              ballparkData[0].lng
            ), // 지도의 중심좌표
            level: 5, // 지도의 확대 레벨
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          const ps = new kakao.maps.services.Places(map);

          ps.categorySearch(
            "FD6",
            (data, status) => {
              if (status === kakao.maps.services.Status.OK) {
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
      });
    }
  }, [ballparkData]);
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div ref={mapRef} id="map" className=" w-[400px] h-[500px]"></div>
      )}
    </div>
  );
}
