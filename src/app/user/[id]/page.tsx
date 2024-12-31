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
    <div className="w-[80%]">
      <BackButton />
      <div className="w-[70%] mx-auto">
        <div className="flex flex-row items-center mb-[50px]">
          <img
            className="w-[40px] h-[40px] rounded-full border-[1px]"
            src={user?.user_metadata.avatar_url}
          />
          <p className="text-[20px] font-kbo tracking-wider ml-[3px]">
            {user.email?.split("@")[0]}
            <span>님의 페이지</span>
          </p>
        </div>
        <section>
          <div className="border-b-[2px] border-dashed border-main-blue">
            <p className="w-fit ml-[10px] border-[2px] border-b-0 rounded-t-lg border-main-blue  py-[4px] px-[8px]">
              작성한 댓글
            </p>
          </div>
          <UserCommentList user_id={user.id} />
        </section>
      </div>
    </div>
  );
}
