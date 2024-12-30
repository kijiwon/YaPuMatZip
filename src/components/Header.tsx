import { createServerSideClientRSC } from "@/app/utils/server";
import { HeaderLoginButton, HeaderLogoutButton } from "./LoginButtons";
import { IoSearch } from "react-icons/io5";

export default async function Header() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = user?.email?.split("@")[0];

  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      <div className="flex flex-row items-center justify-center w-[50%] ">
        <input className="border-y-[3px] border-l-[3px] flex-1 h-[40px] rounded-l-lg focus:outline-none pl-[6px] text-[20px] font-paper_logy tracking-widest" />
        <IoSearch
          size={40}
          className=" cursor-pointer border-y-[3px] border-r-[3px] pr-[5px] rounded-r-lg"
        />
      </div>
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
