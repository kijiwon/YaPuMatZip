import { createServerSideClientRSC } from "@/app/utils/server";
import { HeaderLoginButton, HeaderLogoutButton } from "./LoginButtons";
import SearchBar from "./SearchBar";

export default async function Header() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0];

  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      <SearchBar />
      <div>
        {user ? (
          <div className="flex flex-row items-center">
            <p className="text-[18px] font-paper_logy mr-[10px]">
              {userName}님
            </p>
            <HeaderLogoutButton />
          </div>
        ) : (
          <HeaderLoginButton />
        )}
      </div>
    </header>
  );
}
