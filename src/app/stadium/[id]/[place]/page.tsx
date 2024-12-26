import "../../../globals.css";
import PlaceInfo from "./PlaceInfo";
import PlaceComments from "./PlaceComments";
import { createServerSideClientRSC } from "@/app/utils/server";

export default async function PlacePage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email;

  return (
    <div className="w-[70%] mt-[20px]">
      <PlaceInfo />
      <hr />
      <PlaceComments userEmail={userEmail as string} />
    </div>
  );
}
