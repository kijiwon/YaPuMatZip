'use client'

import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getBallparkInfo = async(id:number)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('ballpark-info').select('*').eq('id',id);

    return result.data
}