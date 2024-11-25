"use client";
import { StadiumType } from "@/types/stadium";
import { useYapuPlaceData } from "../hooks/useYapuPlaceData";

export default function PlaceLists({ stadium }: { stadium: StadiumType }) {
  const { yapuPlaceData } = useYapuPlaceData(stadium.id);

  console.log(yapuPlaceData);

  return <div></div>;
}
