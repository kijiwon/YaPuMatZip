"use client";

import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const handlePageRouter = () => {
    setTimeout(() => {
      router.push(url);
    }, 1500);
  };

  useEffect(() => {
    if (hydrated) handlePageRouter();
  }, [hydrated]);

  if (!hydrated) return;

  return (
    <div className="flex flex-col justify-center items-center px-[100px] py-[50px] bg-white rounded-[15px] shadow-md">
      <p className="text-[24px] font-kbo mb-[10px]">
        {userName}님 로그인 완료!
      </p>
      <p className="text-[16px] font-paper_logy">
        잠시 후 페이지로 이동합니다...
      </p>
    </div>
  );
}
