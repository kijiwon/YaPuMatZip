import { Database } from "../../../database.types";

type TypeYapuPlace = Database["public"]["Tables"]["yapu-place"]["Row"];

export default function PlaceItem({
  yapuPlaceData,
}: {
  yapuPlaceData: TypeYapuPlace[];
}) {
  //   const insideStadium = yapuPlaceData.filter((i) => i.inside_stadium === true);

  return (
    <ul>
      {yapuPlaceData.map((i) => (
        <li
          key={i.id}
          className="border-2 mb-[10px] p-[14px] pl-[26px] pr-[20px] flex flex-row justify-start items-center text-[20px] font-s_core"
        >
          <p className="text-[30px] mr-[10px]">{i.food_type}</p>
          <p>{i.name}</p>
          <p>{i.inside_stadium ? "구장내" : "구장밖"}</p>
          <p className=" ml-auto">{i.info}</p>
        </li>
      ))}
    </ul>
  );
}
