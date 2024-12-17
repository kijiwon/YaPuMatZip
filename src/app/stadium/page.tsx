import { createServerSideClientRSC } from "../utils/server";

export default async function Page() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  return <div>{user?.email}</div>;
}
