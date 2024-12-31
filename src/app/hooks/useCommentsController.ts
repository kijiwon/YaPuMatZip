'use client';

import { useEffect, useState } from "react"
import { Database } from "../../../database.types";
import { createComments, deleteComments, getComments, getCommentsById, updateComments } from "../comment/actions";

type TypeComments = Database['public']['Tables']['comments']['Row'];

export const useCommentsController = (place:string) =>{
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<TypeComments[]>([]);

    const onGetComments = async(place:string) =>{
        setLoading(true);
        try{
            const resultComments = await getComments(place);
            if(resultComments) setComments(resultComments);
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        };
    }

    useEffect(()=>{
        onGetComments(place);
    },[]);

    // comment 생성
    const onCreateComments = async({selectedPlace, content, userEmail}:{selectedPlace:string, content:string, userEmail:string})=>{
        await createComments({place:selectedPlace, content,user_email:userEmail});
        await onGetComments(place);
    }

    // comment 수정
    const onEditComments = async({id, content}:{id:number, content:string}) => {
        await updateComments({id, content});
        await onGetComments(place);
    }

    // comment 삭제
    const onDeleteComments = async(id:number) => {
        await deleteComments(id);
        await onGetComments(place);
    }
    return {loading, comments, onCreateComments, onEditComments, onDeleteComments}
}

export const useCommentsById = (user_id:string) =>{
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<TypeComments[]>([]);

    const onGetCommentsById = async(user_id:string) =>{
        setLoading(true);
        try{
            const resultComments = await getCommentsById(user_id);
            if(resultComments) setComments(resultComments);
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        };
    }

    useEffect(()=>{
        onGetCommentsById(user_id);
    },[]);

   
    return {loading, comments}
}