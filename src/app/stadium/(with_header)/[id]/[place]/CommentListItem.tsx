"use client";

import { Database } from "../../../../../../database.types";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { PiRobot } from "react-icons/pi";
import { useState } from "react";
import { useElapsedTimeToText } from "@/app/hooks/useElapsedTimeToText";

type TypeComments = Database["public"]["Tables"]["comments"]["Row"];
interface Props {
  i: TypeComments;
  userEmail: string;
  onEditComments: ({
    id,
    content,
  }: {
    id: number;
    content: string;
  }) => Promise<void>;
  onDeleteComments: (id: number) => Promise<void>;
}

export default function CommentListItem({
  i,
  userEmail,
  onEditComments,
  onDeleteComments,
}: Props) {
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [editContent, setEditContent] = useState(i.content);

  const elapsedText = useElapsedTimeToText(
    new Date(i.updated_at || i.created_at)
  );

  const onClickEdit = () => {
    setIsClickedEdit(true);
  };

  const onSaveEdit = () => {
    if (editContent.length === 0) {
      alert("한 글자 이상 작성해주세요");
      return;
    }
    if (editContent === i.content) {
      alert("수정된 내용이 없습니다");
      return;
    }
    onEditComments({ id: i.id, content: editContent });
    setIsClickedEdit(false);
  };

  const onBackEdit = () => {
    setEditContent(i.content);
    setIsClickedEdit(false);
  };

  return (
    <li className="w-[100%] grid grid-cols-4 font-kyobo border-b-[2px]">
      <p className="col-span-1 break-all flex flex-row items-center lg:text-[18px] text-[14px] pt-[10px]">
        <PiRobot className="lg:text-[22px] text-[16px]" />
        <span>{i.user_email.split("@")[0]}</span>
      </p>
      <div className="col-span-2 break-words border-l-[2px] border-dashed lg:text-[16px] text-[12px] pl-[10px]">
        {isClickedEdit ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-[80%] h-[50px] pt-[10px]"
          />
        ) : (
          <div>
            <p className="pt-[10px]">{i.content}</p>
            <p className="text-[13px] text-gray-500">
              {elapsedText}
              {i.updated_at && <span className="ml-[6px]">(수정됨)</span>}
            </p>
          </div>
        )}
      </div>
      {i.user_email == userEmail && (
        <div className="col-span-1 h-full flex flex-row justify-end items-center pt-[10px]">
          {isClickedEdit ? (
            <div className="flex flex-row items-center gap-2 lg:text-[14px] text-[12px]">
              <button
                onClick={onBackEdit}
                className="cursor-pointer bg-main-red text-white lg:px-2 lg:py-1 px-[2px] py-[1px] rounded-md"
              >
                닫기
              </button>
              <button
                onClick={onSaveEdit}
                className="cursor-pointer bg-main-blue text-white lg:px-2 lg:py-1 px-[2px] py-[1px] rounded-md mr-[10px]"
              >
                저장
              </button>
            </div>
          ) : (
            <button onClick={onClickEdit} className="mr-[10px]">
              <MdEdit size={16} />
            </button>
          )}
          <button onClick={() => onDeleteComments(i.id)}>
            <FaTrashCan size={16} />
          </button>
        </div>
      )}
    </li>
  );
}
