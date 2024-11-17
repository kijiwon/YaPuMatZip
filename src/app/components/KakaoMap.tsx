"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setIsLoading(true);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          className=" w-[500px] h-[360px]"
          level={3}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
