'use client'

import { createSupabaseBrowserClient } from "../utils/client/supabase"

export const getYapuPlaceInfo = async(id:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('yapu-place')
    .select('*')
    .eq('stadium_id',id)
    .order('id', {ascending:false}); // id를 기준으로 내림차순 정렬

    return result.data
}

export const getYapuPlaceDetailInfo = async(id:string, name:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('yapu-place')
    .select('*')
    .eq('stadium_id',id)
    .eq('name',name);

    return result.data
}

export const getYapuPlaceBySearch = async(term:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('yapu-place')
    .select('*')
    // q가 포함된 name을 가져옴
    .like('name',`%${term}%`)
    .order('id');
    
    if(result.error) console.log('supabase error>>>',result.error)
    return result.data
}
