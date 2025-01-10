import { createServerSideClientRSC } from "@/app/utils/server";
import "../../../globals.css";
import PlaceHeader from "./PlaceHeader";
import PlaceLists from "./PlaceLists";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className=" mt-[20px] w-[70%] flex flex-col items-center">
      <Suspense fallback={<Loading />}>
        <PlaceHeader />
        <PlaceLists userId={user?.id as string} />
      </Suspense>
    </div>
  );
}
