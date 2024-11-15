"use client";

import { useRouter } from "next/navigation";

interface Props {
  teamcolor: string;
  team: string;
  sub_teamcolor?: string;
  sub_team?: string;
  path: string;
}

export default function TeamButton({
  teamcolor,
  team,
  sub_team,
  sub_teamcolor,
  path,
}: Props) {
  const router = useRouter();

  const onClickButton = () => {
    router.push(`/${path}`);
  };

  return (
    <button
      onClick={onClickButton}
      className=" bg-white  text-[24px] rounded-lg  p-1 w-[120px] "
    >
      <span className={`${teamcolor}`}>{team.toUpperCase()}</span>
      {sub_team && (
        <>
          <span className="text-black">/</span>
          <span className={`${sub_teamcolor}`}>{sub_team.toUpperCase()}</span>
        </>
      )}
    </button>
  );
}
