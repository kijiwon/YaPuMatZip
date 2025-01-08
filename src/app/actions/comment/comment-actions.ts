"use server"

import { createServerSideClient } from "../../utils/server"

export const getComments = async(place:string)=>{
    const supabase =await  createServerSideClient();
    const result = await supabase.from('comments')
    .select('*')
    .is('deleted_at',null)
    .eq('place',place)
    .order('created_at',{
        ascending:false // 내림차순 정렬
    });

    return result.data;
};

export const getCommentsById = async(user_id:string,page:number=1, pageSize:number = 10)=>{

    const supabase =await  createServerSideClient();
    const result = await supabase.from('comments')
    .select('*',{count: 'exact'}) // count를 추가로 전달->정확한 행 수를 리턴
    .is('deleted_at',null)
    .eq('user_id',user_id)
    .order('created_at',{
        ascending:false // 내림차순 정렬
    })
    .range((page-1)*pageSize, page*pageSize-1); // 10개씩 가져오기

    return {data:result.data , count:result.count};
};

// comments 생성
export const createComments = async({place,content, user_email, stadium_id}:{place:string,content:string, user_email:string, stadium_id:string})=>{

    const supabase = await createServerSideClient();
    const result = await supabase.from('comments')
    .insert({
       place, content, user_email, stadium_id
    })
    .select();

    return result.data; 
};

// comments 수정
export const updateComments = async({id,content}:{id:number,content:string})=>{
    const supabase = await createServerSideClient();
    const result = await supabase.from('comments')
    .update({
        content,
       updated_at: new Date().toISOString() 
    })
    .eq('id',id)
    .select();

    return result.data; 
};

// comments 삭제
export const deleteComments = async(id:number)=>{
    const supabase = await createServerSideClient();
    const result = await supabase.from('comments')
    .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    })
    .eq('id',id)
    .select();

    return result.data;
};