import { Database } from "../../../../../../database.types";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { PiRobot } from "react-icons/pi";
import { useState } from "react";

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

  const onClickEdit = () => {
    setIsClickedEdit(true);
  };

  const onSaveEdit = () => {
    if (editContent.length === 0) {
      alert("한 글자 이상 작성해주세요");
      return;
    }
    onEditComments({ id: i.id, content: editContent });
    setTimeout(() => {
      alert("수정 완료");
    }, 1000);
    setIsClickedEdit(false);
  };

  const onBackEdit = () => {
    setEditContent(i.content);
    setIsClickedEdit(false);
  };

  return (
    <li className="flex flex-row items-start font-s_core border-b-[2px]">
      <p className="w-[20%] break-all flex flex-row  items-center text-[18px] mr-[10px] pt-[10px]">
        <PiRobot size={22} />
        <span>{i.user_email.split("@")[0]}</span>
      </p>
      <div className="w-[70%] break-words  border-l-[2px] border-dashed text-[16px] pl-[10px]">
        {isClickedEdit ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-fit pt-[10px]"
          />
        ) : (
          <div>
            <p className="pt-[10px]">{i.content}</p>
            <p className="text-[13px] text-gray-500">{i.created_at}</p>
          </div>
        )}
      </div>
      {i.user_email == userEmail && (
        <div className="w-[10%] h-full flex flex-row justify-end items-center pl-[5px] pt-[10px]">
          {isClickedEdit ? (
            <div className="flex flex-row items-center text-[14px]">
              <button onClick={onBackEdit}>닫기</button>
              <button onClick={onSaveEdit} className="mx-[10px]">
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
