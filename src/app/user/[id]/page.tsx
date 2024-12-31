import { createServerSideClientRSC } from "@/app/utils/server";
import BackButton from "@/components/BackButton";

export default async function UserPage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div>
        <BackButton />
      </div>
      user page
    </div>
  );
}
