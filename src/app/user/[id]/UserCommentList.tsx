"use client";

import { useCommentsById } from "@/app/hooks/useCommentsController";

export default function UserCommentList({ user_id }: { user_id: string }) {
  const { loading, comments } = useCommentsById(user_id);

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      {comments.length === 0 ? (
        <div>작성된 댓글 없음</div>
      ) : (
        comments.map((i) => (
          <div key={i.id}>
            <p>{i.place}</p>
            {i.content}
          </div>
        ))
      )}
    </div>
  );
}
