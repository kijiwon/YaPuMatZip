import { createServerSideClientRSC } from "@/app/utils/server";
import BackButton from "@/components/BackButton";
import UserPageModal from "./UserPageModal";
import UserCommentList from "./UserCommentList";

export default async function UserPage() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <UserPageModal />;

  return (
    <div>
      <div>
        <BackButton />
      </div>
      user page
      <UserCommentList user_id={user.id} />
    </div>
  );
}
