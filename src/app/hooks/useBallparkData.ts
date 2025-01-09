'use client'
import { useState } from "react"
import { getBallparkInfo } from "../api/ballpark-info"
import { Database } from "../../../database.types"
import { useEffect } from "react"

type TypeBallpark = Database['public']['Tables']['ballpark-info']['Row']

export const useBallparkData =(id:string) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [ballparkData, setBallparkData] = useState<TypeBallpark[]>([]);

    const onGetData = async(id:string)=>{
        setIsLoading(true);
        try{
         const ballparkInfokData = await getBallparkInfo(id);
         if(ballparkData) setBallparkData(ballparkInfokData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
     }

     useEffect(()=>{
        onGetData(id)
     },[onGetData])

     return {isLoading,ballparkData};
}

