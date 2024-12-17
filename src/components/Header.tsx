import { createServerSideClientRSC } from "@/app/utils/server";
import { HeaderLoginButton, HeaderLogoutButton } from "./LoginButtons";

export default async function Header() {
  const supabase = await createServerSideClientRSC();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className=" pt-[10px] w-[80%] ml-auto mr-auto mb-[10px]  flex flex-row justify-between  items-center">
      <img src="/logo.png" alt="logo" className=" w-[90px] " />
      <div>
        {user ? (
          <>
            <p>{user.email}</p>
            <HeaderLogoutButton />
          </>
        ) : (
          <HeaderLoginButton />
        )}
      </div>
    </header>
  );
}
