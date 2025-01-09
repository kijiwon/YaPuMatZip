'use client';

import { useEffect, useState } from "react";
import { addLikePlace, getLikedPlace, getLikedPlacePagination, removeLikePlace } from "../actions/place-like/place-like-actions";
import { TypePlaceLike } from "@/types/PlaceLike";

export const useLikedPlaceController = (userId:string) =>{
    const [loading, setLoading] = useState(false);
    const [likedPlace, setLikedPlace] = useState<TypePlaceLike[]>([]);
    
   const onGetLikedPlace = async(userId:string) => {
    setLoading(true);
    try {
        const result = await getLikedPlace(userId);
        if(result) setLikedPlace(result.liked_place as TypePlaceLike[])
    } catch (error) {
       console.log(error) 
    } finally {
        setLoading(false);
    }
   }
   
   useEffect(()=>{
    onGetLikedPlace(userId);
   },[]);

   const onAddPlace = async({id,place_name, stadium_id}:{id:string,place_name:string, stadium_id:string}) => {
    await addLikePlace({id,place_name, stadium_id});
    await onGetLikedPlace(id)
   }

  const onRemovePlace = async({id, place_name}:{id:string, place_name:string}) => {
    await removeLikePlace({id, place_name});
    await onGetLikedPlace(id);
  } 

  return {loading, likedPlace, onAddPlace, onRemovePlace}
}


export const useLikedPlacePagination = (userId:string, pageSize:number=5) =>{
    const [loading, setLoading] = useState(false);
    const [likedPlace, setLikedPlace] = useState<TypePlaceLike[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

   const onGetLikedPlacePagination = async(page:number) => {
    setLoading(true);
    try {
        const result = await getLikedPlacePagination(userId);
        if(result.data){
            const allLikedPlaces =result.data[0].liked_place as TypePlaceLike[];
            setTotal(allLikedPlaces.length);

            const paginatedPlaces = allLikedPlaces.slice((page - 1) * pageSize, page * pageSize);
            setLikedPlace(paginatedPlaces);
        }
    } catch (error) {
       console.log(error) 
    } finally {
        setLoading(false);
    }
   }
   
   useEffect(()=>{
    onGetLikedPlacePagination(page);
   },[userId, page]);

  return {loading, likedPlace, total, page, pageSize, setPage}
}
