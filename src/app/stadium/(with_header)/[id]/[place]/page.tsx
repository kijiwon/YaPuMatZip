import "../../../../globals.css";
import PlaceInfo from "./PlaceInfo";
import PlaceComments from "./PlaceComments";
import { createServerSideClientRSC } from "@/app/utils/server";
import { getUserInfo } from "@/app/actions/user/user-actions";
import { Suspense } from "react";
import Loading from "./loading";

export default async function PlacePage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getUserInfo(user?.id as string);

  return (
    <div className="lg:w-[70%] w-[90%] mt-[20px]">
      <Suspense fallback={<Loading />}>
        <PlaceInfo
          userEmail={data?.email as string}
          userId={data?.id as string}
        />
        <hr />
        <PlaceComments userEmail={data?.email as string} />
      </Suspense>
    </div>
  );
}
