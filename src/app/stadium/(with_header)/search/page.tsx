"use client";

import { useEffect } from "react";
import "../../../globals.css";
import { getYapuPlaceBySearch } from "@/app/api/yapu-place-info";
export default function Search() {
  useEffect(() => {
    getYapuPlaceBySearch("보영");
  }, []);
  return <div>search page</div>;
}
