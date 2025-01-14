"use client";

import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Modal({ userName }: { userName: string }) {
  const { selectedStadium } = useStadiumStore();
  const { selectedPlace } = usePlaceStore();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const term = sessionStorage.getItem("term");

  useEffect(() => {
    setHydrated(true);
  }, []);

  const url = term
    ? `/stadium/search?q=${term}`
    : selectedPlace
      ? `/stadium/${selectedStadium?.id}/${selectedPlace}`
      : `/stadium/${selectedStadium?.id}`;

  const handlePageRouter = useCallback(() => {
    setTimeout(() => {
      router.push(url);
    }, 1500);
  }, [url, router]);

  useEffect(() => {
    if (hydrated) handlePageRouter();
  }, [hydrated, handlePageRouter]);

  if (!hydrated) return;

  return (
    <div className="flex flex-col justify-center items-center lg:px-[100px] px-[20px] py-[50px] bg-white rounded-[15px] shadow-md">
      <p className="lg:text-[24px] text-[20px] font-kbo mb-[10px]">
        {userName}
        <span className="ml-[3px]">님 로그인 완료!</span>
      </p>
      <p className="lg:text-[16px] text-[13px] font-s_core">
        잠시 후 페이지로 이동합니다...
      </p>
    </div>
  );
}
