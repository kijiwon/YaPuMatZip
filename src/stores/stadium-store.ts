import { StadiumType } from '@/types/stadium';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Stadium = StadiumType

export type StadiumStore = {
  selectedStadium: Stadium | null; 
  setSelectedStadium: (stadium: Stadium) => void;
  clearSelectedStadium : () => void; 
};

export const useStadiumStore = create(
  persist<StadiumStore>(
    (set) => ({
      selectedStadium: null,
      setSelectedStadium: (stadium) => set({ selectedStadium: stadium }),
      clearSelectedStadium: () => set({selectedStadium:null})
    }),
    {
      name: 'stadium-storage',
       storage: createJSONStorage(()=> sessionStorage) // session storage에 저장
    }
  )
);