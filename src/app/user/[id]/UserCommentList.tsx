"use client";

import { useCommentsById } from "@/app/hooks/useCommentsController";
import UserCommentListItem from "./UserCommentListItem";
import { useEffect } from "react";
import { getUserInfo } from "@/app/actions/user-info/user-actions";

export default function UserCommentList({ user_id }: { user_id: string }) {
  const { loading, comments } = useCommentsById(user_id);

  useEffect(() => {
    getUserInfo(user_id);
  }, []);
  if (loading) return <div>로딩중...</div>;

  if (comments.length === 0) return <div>작성된 댓글이 없어요!</div>;

  return (
    <ul className="flex flex-col justify-center items-center pt-[10px]">
      {comments.map((comment) => (
        <UserCommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
