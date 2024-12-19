import "../../../globals.css";
import PlaceInfo from "./PlaceInfo";
import PlaceComments from "./PlaceComments";
import { createServerSideClientRSC } from "@/app/utils/server";

export default async function PlacePage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0] as string;
  console.log(userName);

  return (
    <div className="w-[70%] mt-[20px]">
      <PlaceInfo />
      <hr />
      <PlaceComments userName={userName} />
    </div>
  );
}
