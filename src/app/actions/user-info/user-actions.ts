"use server";

import { createServerSideClient } from "@/app/utils/server";

type PlaceLike = {
    place_name:string;
    stadium_id:string;
}

export const getUserInfo = async(id:string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
    .from('profiles')
    .select('*')
    .eq('id',id)
    .single();

    return result.data;
}

// 좋아요 추가
export const addLikePlace = async({id,place_name, stadium_id}:{id:string,place_name:string, stadium_id:string}) => {
    const supabase = await createServerSideClient();
    const {data:userProfile, error} = await supabase
    .from('profiles')
    .select('*')
    .eq('id',id)
   .single();
   
   if(error){
    console.log('error>>>', error);
    return;
   }

   let currentLikes:PlaceLike[]  =  [];

   // place-like 데이터가 배열인지 확인
   if(userProfile && Array.isArray(userProfile['place-like'])){
    currentLikes = userProfile['place-like'] as PlaceLike[]
   }

   const newPlaceLike = {
    place_name,
    stadium_id
   };
   const updatedLikes= [...currentLikes, newPlaceLike];

   const result = await supabase 
   .from('profiles')
   .update({'place-like':updatedLikes})
   .eq('id', id);

   console.log('result>>>>',result.data)
   return result.data;
}

// 좋아요 삭제
export const removeLikePlace = async({id, place_name}:{id:string, place_name:string}) => {
    const supabase = await createServerSideClient();
    const {data:userProfile, error} = await supabase
    .from('profiles')
    .select('*')
    .eq('id',id)
   .single();
   
   if(error){
    console.log('error>>>', error);
    return;
   }

   const currentLikes: PlaceLike[] = userProfile["place-like"] as PlaceLike[];
   // place_name이 일치하지 않는 데이터만 담기
   const updatedLikes = currentLikes.filter((i)=> i.place_name !== place_name);

   const result = await supabase
   .from('profiles')
   .update({"place-like":updatedLikes})
   .eq('id',id);

   return result.data;
}