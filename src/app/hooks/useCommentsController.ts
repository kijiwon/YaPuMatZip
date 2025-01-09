'use client';

import { useEffect, useState } from "react"
import { Database } from "../../../database.types";
import { createComments, deleteComments, getComments, getCommentsById, updateComments } from "../actions/comment/comment-actions";

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
    },[place]);

    // comment 생성
    const onCreateComments = async({selectedPlace, content, userEmail, stadium_id}:{selectedPlace:string, content:string, userEmail:string, stadium_id:string})=>{
        await createComments({place:selectedPlace, content,user_email:userEmail, stadium_id});
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

export const useCommentsById = (user_id:string, pageSize:number=10) =>{
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<TypeComments[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const onGetCommentsById = async(page:number) =>{
        setLoading(true);
        try{
            const result= await getCommentsById(user_id,page,pageSize);
            if(result?.data){
                setComments(result.data);
                setTotal(result.count || 0);
            }
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        };
    }

    useEffect(()=>{
        onGetCommentsById(page);
    },[user_id, page]);

   
    return {loading, comments, total, page, pageSize, setPage}
}