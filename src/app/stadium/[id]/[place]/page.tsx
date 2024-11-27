"use client";

import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";

export default function PlacePage() {
  const { isLoading, recommendedMenusData } =
    useRecommededMenusData("요거트월드");
  if (!isLoading) console.log("//pagedata", recommendedMenusData);
  return <div>Page</div>;
}
