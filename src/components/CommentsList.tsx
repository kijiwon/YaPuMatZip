import { PiRobot } from "react-icons/pi";

export default function CommentsList() {
  return (
    <ul className="mb-[20px] px-[80px]">
      <li className="flex flex-row items-start font-s_core border-b-[2px]">
        <p className=" flex flex-row items-center text-[18px] mr-[10px]">
          <PiRobot size={22} />
          <span>죠니</span>
        </p>
        <div className="border-l-[2px] border-dashed text-[16px] pl-[5px]">
          <p>여긴 인정이지</p>
          <p className="text-[13px] text-gray-500">2시간 전</p>
        </div>
      </li>
    </ul>
  );
}
