"use client";

import { useElapsedTimeToText } from "@/app/hooks/useElapsedTimeToText";
import { Database } from "../../../../database.types";
import { useRouter } from "next/navigation";

type TypeComments = Database["public"]["Tables"]["comments"]["Row"];

export default function UserCommentListItem({
  comment,
}: {
  comment: TypeComments;
}) {
  const router = useRouter();

  const elapsedText = useElapsedTimeToText(
    new Date(comment.updated_at || comment.created_at)
  );

  const slicedContent =
    comment.content.length > 30
      ? comment.content.slice(0, 30) + "..."
      : comment.content;

  const onClickComment = () => {
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
