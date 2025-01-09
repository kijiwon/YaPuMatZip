"use client";

import { useCommentsById } from "@/app/hooks/useCommentsController";
import UserCommentListItem from "./UserCommentListItem";

export default function UserCommentList({ user_id }: { user_id: string }) {
  const { loading, comments, total, page, pageSize, setPage } =
    useCommentsById(user_id);
  const totalPages = Math.ceil(total / pageSize); // 총 페이지 수

  if (loading) return <div>로딩중...</div>;

  if (comments.length === 0) return <div>작성된 댓글이 없어요!</div>;

  return (
    <>
      <ul className="min-h-[80%] flex flex-col pt-[20px]">
        {comments.map((comment) => (
          <UserCommentListItem key={comment.id} comment={comment} />
        ))}
      </ul>
      <div className="flex flex-row items-center justify-center font-paper_logy text-[14px]">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`text-white py-2 px-4 ${
              page === idx + 1 ? " bg-main-blue" : "bg-gray-200"
            } hover:bg-main-blue`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}
