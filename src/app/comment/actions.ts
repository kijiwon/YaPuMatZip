"use server"

import { createServerSideClient } from "../utils/server"

export const getComments = async(place:string)=>{
    console.log('comment 가져오기', place);
    const supabase =await  createServerSideClient();
    const result = await supabase.from('comments')
    .select('*')
    .is('deleted_at',null)
    .eq('place',place)
    .order('created_at',{
        ascending:false // 내림차순 정렬
    });

    return result.data;
}

// comments 생성
export const createComments = async({place,content, user_email}:{place:string,content:string, user_email:string})=>{
    console.log('comment 작성', place,content, user_email)
    const supabase = await createServerSideClient();
    const result = await supabase.from('comments')
    .insert({
       place, content, user_email
    })
    .select('*');

    return result.data; 
}

// comments 수정
export const updateComments = async({id,content}:{id:number,content:string})=>{
    const supabase = await createServerSideClient();
    const result = await supabase.from('comments')
    .update({
        content,
       updated_at: new Date().toISOString() 
    })
    .eq('id',id)
    .select('*');

    return result.data; 
}