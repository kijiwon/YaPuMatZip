'use client'
import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getComments = async(place:string)=>{
    console.log('comment 가져오기', place)
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('comments').select('*').is('deleted_at',null).eq('place',place).order('created_at',{
        ascending:false // 내림차순 정렬
    });

    console.log(result.data)
    return result.data
}

