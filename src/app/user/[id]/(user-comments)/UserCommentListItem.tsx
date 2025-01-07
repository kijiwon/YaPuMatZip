"use client";

import { useElapsedTimeToText } from "@/app/hooks/useElapsedTimeToText";
import { useRouter } from "next/navigation";
import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import StadiumData from "@/data/stadiums.json";
import { Database } from "../../../../../database.types";

type TypeComments = Database["public"]["Tables"]["comments"]["Row"];

export default function UserCommentListItem({
  comment,
}: {
  comment: TypeComments;
}) {
  const router = useRouter();
  const { setSelectedStadium } = useStadiumStore();
  const { setSelectedPlace } = usePlaceStore();

  const stadium = StadiumData.filter((i) => i.id === comment.stadium_id);

  const elapsedText = useElapsedTimeToText(
    new Date(comment.updated_at || comment.created_at)
  );

  const slicedContent =
    comment.content.length > 30
      ? comment.content.slice(0, 30) + "..."
      : comment.content;

  const onClickComment = () => {
    setSelectedStadium(stadium[0]);
    setSelectedPlace(comment.place);
    router.push(`/stadium/${comment.stadium_id}/${comment.place}`);
  };

  return (
    <li
      onClick={onClickComment}
      className="w-[90%] mb-[10px] cursor-pointer  flex flex-row justify-center items-center"
    >
      <p>{comment.place}</p>
      <p className="flex-1">
        {slicedContent}
        {comment.updated_at && <span>(수정됨)</span>}
      </p>
      <p>{elapsedText}</p>
    </li>
  );
}
