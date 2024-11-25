'use client'
import { useState } from "react"
import { Database } from "../../../database.types"
import { useEffect } from "react"
import { getYapuPlaceInfo } from "../api/yapu-place-info"

type TypeYapuPlace = Database['public']['Tables']['yapu-place']['Row']

export const useYapuPlaceData =(id:string) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [yapuPlaceData, setYapuPlaceData] = useState<TypeYapuPlace[]>([]);

    const onGetData = async(id:string)=>{
        setIsLoading(true);
        try{
         const yapuPlaceInfoData = await getYapuPlaceInfo(id);
         if(yapuPlaceInfoData) setYapuPlaceData(yapuPlaceInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
     }

     useEffect(()=>{
        onGetData(id)
     },[])

     return {isLoading,yapuPlaceData};
}

