"use client";

import { TypePlaceLike } from "@/types/PlaceLike";
import LikedPlaceListItem from "./LikedPlaceListItem";

export default function LikedPlaceList({
  likedPlace,
}: {
  likedPlace: TypePlaceLike[] | [];
}) {
  if (!likedPlace || likedPlace.length === 0) return <div>no data</div>;
  return (
    <div>
      <ul>
        {likedPlace.map((i, idx) => (
          <LikedPlaceListItem key={idx} i={i} />
        ))}
      </ul>
    </div>
  );
}
