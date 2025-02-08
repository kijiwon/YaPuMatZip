"use client";

import Image from "next/image";
import LogoImage from "../../public/logo.png";
import { useRouter } from "next/navigation";
import { useStadiumStore } from "@/stores/stadium-store";
import { usePlaceStore } from "@/stores/place-store";

export default function Logo({ size }: { size: number }) {
  const router = useRouter();
  const { clearSelectedStadium } = useStadiumStore();
  const { clearSelectedPlace } = usePlaceStore();

  const onClickLogo = () => {
    router.push("/");
    clearSelectedStadium();
    clearSelectedPlace();
  };

  return (
    <Image
      width={size}
      src={LogoImage}
      alt="logo"
      className="cursor-pointer"
      onClick={onClickLogo}
    />
  );
}
