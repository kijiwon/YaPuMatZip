'use client'
import { useState } from "react"
import { Database } from "../../../database.types"
import { useEffect } from "react"
import { getYapuPlaceDetailInfo, getYapuPlaceInfo } from "../api/yapu-place-info"

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

export const useYapuPlaceDatailData =(id:string,name:string) =>{
    const [isPlaceLoading, setIsPlaceLoading] = useState(true);
    const [yapuPlaceDetailData, setYapuPlaceDetailData] = useState<TypeYapuPlace[]>([]);
    
    const onGetData = async(id:string, name:string)=>{
        setIsPlaceLoading(true);
        try{
         const yapuPlaceDetailInfoData = await getYapuPlaceDetailInfo(id,name);
         if(yapuPlaceDetailInfoData) setYapuPlaceDetailData(yapuPlaceDetailInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsPlaceLoading(false);
        }
     }

     useEffect(()=>{
        onGetData(id,name)
     },[])

     return {isPlaceLoading,yapuPlaceDetailData};
}

