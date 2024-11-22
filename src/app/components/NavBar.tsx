"use client";

import StadiumData from "@/data/stadiums.json";
import { useParams } from "next/navigation";

export default function NavBar() {
  const params = useParams();
  const filteredData = StadiumData.filter((i) => i.id !== params.id);

  return (
    <nav className=" flex flex-row">
      {filteredData.map((i) => (
        <div key={i.id}>{i.team_short}</div>
      ))}
    </nav>
  );
}
