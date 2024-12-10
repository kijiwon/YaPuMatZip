'use client'

import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getRecommendedMenusInfo = async(id:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('recommended-menus').select('*').eq('place_id',id);

    return result.data
}