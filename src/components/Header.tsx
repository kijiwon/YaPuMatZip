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
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <Image width={90} src={LogoImage} alt="logo" className=" w-[90px] " />
      <SearchBar />
      <div>
        {user ? (
          <UserButton userName={userName as string} />
        ) : (
          <HeaderLoginButton />
        )}
      </div>
    </header>
  );
}
