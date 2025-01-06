import "../../../../globals.css";
import PlaceInfo from "./PlaceInfo";
import PlaceComments from "./PlaceComments";
import { createServerSideClientRSC } from "@/app/utils/server";
import { TypePlaceLike } from "@/types/PlaceLike";
import { getUserInfo } from "@/app/actions/user/user-actions";

export default async function PlacePage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getUserInfo(user?.id as string);
  // const placeLike = Array.isArray(data?.liked_place)
  //   ? (data.liked_place as TypePlaceLike[])
  //   : [];
  const likedPlace = data?.liked_place;

  return (
    <div className="w-[70%] mt-[20px]">
      <PlaceInfo
        userEmail={data?.email as string}
        userId={data?.id as string}
        likedPlace={likedPlace}
      />
      <hr />
      <PlaceComments userEmail={data?.email as string} />
    </div>
  );
}
