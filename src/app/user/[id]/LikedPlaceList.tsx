"use client";

import { TypePlaceLike } from "@/types/PlaceLike";
import { useEffect, useState } from "react";

export default function LikedPlaceList(likedPlace: TypePlaceLike[] | []) {
  useEffect(() => {
    console.log(likedPlace);
  }, []);

  return (
    <div>
      <ul>
        {likedPlace.likedPlace.map((i) => (
          <p>{i.place_name}</p>
        ))}
      </ul>
    </div>
  );
}
