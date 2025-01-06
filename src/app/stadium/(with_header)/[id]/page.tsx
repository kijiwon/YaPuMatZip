import { createServerSideClientRSC } from "@/app/utils/server";
import "../../../globals.css";
import { getUserInfo } from "@/app/actions/user-info/user-actions";
import { TypePlaceLike } from "@/types/PlaceLike";
import PlaceHeader from "./PlaceHeader";
import PlaceLists from "./PlaceLists";

export default async function Page() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getUserInfo(user?.id as string);
  const placeLike = Array.isArray(data?.["place-like"])
    ? (data["place-like"] as TypePlaceLike[])
    : [];

  return (
    <div className=" mt-[20px]">
      <PlaceHeader />
      <PlaceLists />
    </div>
  );
}
