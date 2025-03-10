"use client";

import Image from "next/image";
import LogoImage from "../../public/logo.png";
import { useRouter } from "next/navigation";
import { usePlaceStore } from "@/stores/place-store";

export default function Logo({ size }: { size: number }) {
  const router = useRouter();
  const { selectedPlace, clearSelectedPlace } = usePlaceStore();

  const onClickLogo = () => {
    router.push("/");
    if (selectedPlace) clearSelectedPlace();
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
