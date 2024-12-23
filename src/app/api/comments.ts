'use client'
import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getComments = async(place:string)=>{
    console.log('comment 가져오기', place)
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('comments')
    .select('*')
    .is('deleted_at',null)
    .eq('place',place)
    .order('created_at',{
        ascending:false // 내림차순 정렬
    });

    console.log(result.data)
    return result.data
}

// comments 생성
export const createComments = async({place,content, user_email}:{place:string,content:string, user_email:string})=>{
    console.log('comment 작성', place,content, user_email)
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('comments')
    .insert({
       place, content, user_email
    })
    .select();
    
    console.log(result.data)
    return result.data 
}