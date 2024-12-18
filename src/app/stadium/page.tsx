import "../globals.css";
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
    <div className="w-[100vw] h-[100vh] bg-zinc-300 flex flex-col justify-center items-center">
      <Modal userName={userName} />
    </div>
  );
}
