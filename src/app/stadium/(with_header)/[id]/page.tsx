import { createServerSideClientRSC } from "@/app/utils/server";
import "../../../globals.css";
import PlaceHeader from "./PlaceHeader";
import PlaceLists from "./PlaceLists";

export default async function Page() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className=" mt-[20px]">
      <PlaceHeader />
      <PlaceLists userId={user?.id as string} />
    </div>
  );
}
