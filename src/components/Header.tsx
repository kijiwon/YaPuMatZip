import { createServerSideClientRSC } from "@/app/utils/server";
import { HeaderLoginButton } from "./LoginButtons";
import SearchBar from "./SearchBar";
import UserButton from "./UserButton";
import Logo from "./Logo";

export default async function Header() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0];

  return (
    <>
      <header className="hidden my-[10px] w-[90%] mx-auto  lg:flex flex-row items-center justify-center">
        <Logo size={90} />
        <SearchBar />
        <div>
          {user ? (
            <UserButton userName={userName as string} />
          ) : (
            <HeaderLoginButton />
          )}
        </div>
      </header>
      <div className="lg:hidden relative w-full">
        <header className="z-20 fixed bg-white w-screen mx-auto px-7  flex flex-col items-center pt-[10px] pb-[10px]">
          <div className="w-[100%] flex flex-row justify-between items-center mb-[10px]">
            <Logo size={60} />
            {user ? (
              <UserButton userName={userName as string} />
            ) : (
              <HeaderLoginButton />
            )}
          </div>
        </header>
      </div>
    </>
  );
}
