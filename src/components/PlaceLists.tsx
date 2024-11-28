"use client";
import { StadiumType } from "@/types/stadium";
import { useYapuPlaceData } from "../app/hooks/useYapuPlaceData";
import PlaceItem from "./PlaceItem";

export default function PlaceLists({ stadium }: { stadium: StadiumType }) {
  const { isLoading, yapuPlaceData } = useYapuPlaceData(stadium.id);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <PlaceItem yapuPlaceData={yapuPlaceData} stadium={stadium} />
      )}
    </div>
  );
}
