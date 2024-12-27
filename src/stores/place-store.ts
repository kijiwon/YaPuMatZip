import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PlaceStore = {
  selectedPlace: string | null; 
  setSelectedPlace: (place: string) => void;
  clearSelectedPlace : () => void;
};

export const usePlaceStore = create(
  persist<PlaceStore>(
    (set) => ({
      selectedPlace: null,
      setSelectedPlace: (place) => set({ selectedPlace: place }),
      clearSelectedPlace: ()=>set({selectedPlace:null}), 
    }),
    {
      name: 'place-storage',
      storage: createJSONStorage(()=> sessionStorage) // session storage에 저장
    }
  )
);