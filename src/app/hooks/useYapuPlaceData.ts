'use client'
import { useCallback, useState } from "react"
import { Database } from "../../../database.types"
import { useEffect } from "react"
import { getYapuPlaceBySearch, getYapuPlaceDetailInfo, getYapuPlaceInfo } from "../api/yapu-place-info"

type TypeYapuPlace = Database['public']['Tables']['yapu-place']['Row']

export const useYapuPlaceData =(id:string) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [yapuPlaceData, setYapuPlaceData] = useState<TypeYapuPlace[]>([]);

    const onGetData =useCallback(
        async(id:string)=>{
        setIsLoading(true);
        try{
         const yapuPlaceInfoData = await getYapuPlaceInfo(id);
         if(yapuPlaceInfoData) setYapuPlaceData(yapuPlaceInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
     },[]) 

     useEffect(()=>{
        onGetData(id)
     },[id, onGetData])

     return {isLoading,yapuPlaceData};
}

export const useYapuPlaceDetailData =(id:string,name:string) =>{
    const [isPlaceLoading, setIsPlaceLoading] = useState(true);
    const [yapuPlaceDetailData, setYapuPlaceDetailData] = useState<TypeYapuPlace[]>([]);
    
    const onGetData =useCallback(
         async(id:string, name:string)=>{
        setIsPlaceLoading(true);
        try{
         const yapuPlaceDetailInfoData = await getYapuPlaceDetailInfo(id,name);
         if(yapuPlaceDetailInfoData) setYapuPlaceDetailData(yapuPlaceDetailInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsPlaceLoading(false);
        }
     },[])

     useEffect(()=>{
        onGetData(id,name)
     },[id, name, onGetData])

     return {isPlaceLoading,yapuPlaceDetailData};
}

export const useYapuPlaceBySearch =(term:string) =>{
    const [isPlaceLoading, setIsPlaceLoading] = useState(true);
    const [yapuPlaceSearchlData, setYapuPlaceSearchData] = useState<TypeYapuPlace[]>([]);
    
    useEffect(() => {
        if (!term) {
            setIsPlaceLoading(false);
            setYapuPlaceSearchData([]);
            return;
        }
        
        const fetchData = async () => {
            setIsPlaceLoading(true);
            try {
                const placeDataBySearch = await getYapuPlaceBySearch(term);
                if (placeDataBySearch) setYapuPlaceSearchData(placeDataBySearch);
            } catch (error) {
                console.error(error);
            } finally {
                setIsPlaceLoading(false);
            }
        };
        // term이 들어오면 데이터패칭
        if (term) {
            fetchData();
        }
    }, [term]);  

     return {isPlaceLoading,yapuPlaceSearchlData};
}

