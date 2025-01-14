import { createServerSideClientRSC } from "@/app/utils/server";
import BackButton from "@/components/BackButton";
import UserPageModal from "./UserPageModal";
// import DefaultImage from "../../../../public/logo.png";

import UserDataSection from "./UserDataSection";
import Image from "next/image";

export default async function UserPage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <UserPageModal />;

  return (
    <div className="lg:w-[80%] w-[90%] h-screen">
      <BackButton />
      <div className="lg:w-[70%] lg:h-[80%] mx-auto pt-[20px]">
        <div className="flex flex-row lg:items-end items-center mb-[50px] border-[2px] rounded-2xl lg:py-[10px] lg:px-[20px] py-1 px-3 border-main-blue">
          <Image
            width={40}
            height={40}
            alt="user-profile"
            className="rounded-full border-[1px]"
            src={user?.user_metadata.avatar_url || "/logo.png"}
          />
          <p className=" font-kbo tracking-wider lg:ml-[3px] ml-[5px]">
            <span className="lg:text-[22px] text-[16px]">
              @{user.email?.split("@")[0]}
            </span>
            <span className="font-s_core_bold lg:text-[16px] text-[14px] ml-[5px]">
              님의 페이지
            </span>
          </p>
        </div>
        <UserDataSection userId={user.id} />
      </div>
    </div>
  );
}
