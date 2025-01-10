import { createServerSideClientRSC } from "@/app/utils/server";
import BackButton from "@/components/BackButton";
import UserPageModal from "./UserPageModal";

import UserDataSection from "./UserDataSection";

export default async function UserPage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <UserPageModal />;

  return (
    <div className="w-[80%] h-[100vh]">
      <BackButton />
      <div className="w-[70%] h-[80%]  mx-auto pt-[20px]">
        <div className="flex flex-row items-end mb-[50px] border-[2px] rounded-2xl py-[10px] px-[20px] border-main-blue">
          <img
            alt="user-profile"
            className="w-[40px] h-[40px] rounded-full border-[1px]"
            src={user?.user_metadata.avatar_url}
          />
          <p className=" font-kbo tracking-wider ml-[3px]">
            <span className="text-[22px]">{user.email?.split("@")[0]}</span>
            <span className="text-[16px] ml-[5px]">님의 페이지</span>
          </p>
        </div>
        <UserDataSection userId={user.id} />
      </div>
    </div>
  );
}
