'use client'
import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getComments = async(place:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('comments').select('*').is('deleted_at',null).eq('place',place);

    return result.data
}

