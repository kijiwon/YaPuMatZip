import { createServerSideClientRSC } from "@/app/utils/server";
import { HeaderLoginButton } from "./LoginButtons";
import SearchBar from "./SearchBar";
import UserButton from "./UserButton";
import Image from "next/image";
import LogoImage from "../../public/logo.png";

export default async function Header() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0];

  return (
    <>
      <header className="hidden pt-[10px] w-[80%] mx-auto mb-[10px] lg:flex lg:flex-row justify-between  items-center">
        <Image width={90} src={LogoImage} alt="logo" />
        <SearchBar />
        <div>
          {user ? (
            <UserButton userName={userName as string} />
          ) : (
            <HeaderLoginButton />
          )}
        </div>
      </header>
      <header className="lg:hidden fixed bg-white w-screen mx-auto px-7  flex flex-col items-center pt-[10px] pb-[10px]">
        <div className="w-[100%] flex flex-row justify-between items-center mb-[10px]">
          <Image width={60} src={LogoImage} alt="logo" />
          {user ? (
            <UserButton userName={userName as string} />
          ) : (
            <HeaderLoginButton />
          )}
        </div>
      </header>
    </>
  );
}
