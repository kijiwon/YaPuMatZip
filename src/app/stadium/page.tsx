import { createServerSideClientRSC } from "../utils/server";
import Modal from "./Modal";

export default async function Page() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0];
  if (!userName) return;
  return (
    <div>
      <Modal userName={userName} />
    </div>
  );
}
