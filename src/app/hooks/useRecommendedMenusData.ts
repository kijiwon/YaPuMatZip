'use client'
import { useState } from "react"
import { Database } from "../../../database.types"
import { useEffect } from "react"
import { getRecommendedMenusInfo } from "../api/recommended-menus-info"


type TypeRecommendedMenus = Database['public']['Tables']['recommended-menus']['Row']

export const useRecommededMenusData =(id:string) =>{
    const [isMenuLoading, setIsMenuLoading] = useState(true);
    const [recommendedMenusData, setRecommendedMenusData] = useState<TypeRecommendedMenus[]>([]);

    const onGetData = async(id:string)=>{
        setIsMenuLoading(true);
        try{
         const recommendedMenusInfoData = await getRecommendedMenusInfo(id);
         if(recommendedMenusInfoData) setRecommendedMenusData(recommendedMenusInfoData!);
        } catch(error){
            console.log(error);
        } finally{
            setIsMenuLoading(false);
        }
     }

     useEffect(()=>{
        onGetData(id)
     },[id])

     return {isMenuLoading,recommendedMenusData};
}

