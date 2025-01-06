"use server";

import { createServerSideClient } from "@/app/utils/server";

export const getUserInfo = async(id:string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
    .from('profiles')
    .select('*')
    .eq('id',id)
    .single();

    return result.data;
}