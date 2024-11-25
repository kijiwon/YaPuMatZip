'use client'

import { createSupabaseBrowserClient } from "../lib/client/supabase"

export const getYapuPlaceInfo = async(id:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('yapu-place').select('*').eq('stadium_id',id);

    return result.data
}