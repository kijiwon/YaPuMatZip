"use client";

import dynamic from "next/dynamic";

const DynamicRecord = dynamic(() => import("./Record"), { ssr: false });

export default function Home() {
  return (
    <div>
      Home
      <DynamicRecord />
    </div>
  );
}
