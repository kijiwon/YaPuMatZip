'use client'
import { useState } from "react"
import { Database } from "../../../database.types"
import { useEffect } from "react"
import { getRecommendedMenusInfo } from "../api/recommended-menus-info"


type TypeRecommendedMenus = Database['public']['Tables']['recommended-menus']['Row']

export const useRecommededMenusData =(id:string) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [recommendedMenusData, setRecommendedMenusData] = useState<TypeRecommendedMenus[]>([]);

    const onGetData = async(id:string)=>{
        setIsLoading(true);
        try{
         const recommendedMenusInfoData = await getRecommendedMenusInfo(id);
         if(recommendedMenusInfoData) setRecommendedMenusData(recommendedMenusInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
     }

     useEffect(()=>{
        onGetData(id)
     },[])

     return {isLoading,recommendedMenusData};
}

