"use client";

import { createSupabaseBrowserClient } from "@/app/lib/client/supabase";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    const checkSession = async () => {
      const supabase = await createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(">>error", error);
        return;
      }
      if (data.session) {
        console.log(">>session", data.session);
      }
    };

    checkSession();
  }, []);
  return <div>login...</div>;
}
