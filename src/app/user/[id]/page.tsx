import { createServerSideClientRSC } from "@/app/utils/server";
import BackButton from "@/components/BackButton";
import UserPageModal from "./UserPageModal";
import { getPlaceLike } from "@/app/actions/place-like/place-like-actions";
import { TypePlaceLike } from "@/types/PlaceLike";

import UserDataSection from "./UserDataSection";

export default async function UserPage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getPlaceLike(user?.id as string);
  const likedPlace = data?.liked_place as TypePlaceLike[] | [];

  if (!user) return <UserPageModal />;

  return (
    <div className="w-[80%] h-[100vh]">
      <BackButton />
      <div className="w-[70%] h-[80%]  mx-auto pt-[30px] border-[2px]">
        <div className="flex flex-row items-center mb-[50px] pl-[20px]">
          <img
            className="w-[40px] h-[40px] rounded-full border-[1px]"
            src={user?.user_metadata.avatar_url}
          />
          <p className="text-[20px] font-kbo tracking-wider ml-[3px]">
            {user.email?.split("@")[0]}
            <span>님의 페이지</span>
          </p>
        </div>
        <UserDataSection userId={user.id} likedPlace={likedPlace} />
      </div>
    </div>
  );
}
