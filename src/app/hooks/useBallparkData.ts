'use client'
import { useCallback, useState } from "react"
import { getBallparkInfo } from "../api/ballpark-info"
import { Database } from "../../../database.types"
import { useEffect } from "react"

type TypeBallpark = Database['public']['Tables']['ballpark-info']['Row']

export const useBallparkData =(id:number) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [ballparkData, setBallparkData] = useState<TypeBallpark[]>([]);

    const onGetData = useCallback(async (id: number) => {
        setIsLoading(true);
        try {
          const ballparkInfoData = await getBallparkInfo(id);
          if (ballparkInfoData) setBallparkData(ballparkInfoData);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }, []);
    
      useEffect(() => {
        onGetData(id);
      }, [id, onGetData]);

     return {isLoading,ballparkData};
}

