
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Place = {
    place_name:string 
}

export type PlaceStore = {
  selectedPlace: string | null; 
  setSelectedPlace: (place: string) => void;
  clearSelectedPlace : () => void 
};

export const usePlaceStore = create(
  persist<PlaceStore>(
    (set) => ({
      selectedPlace: null,
      setSelectedPlace: (place) => set({ selectedPlace: place }),
      clearSelectedPlace: ()=>set({selectedPlace:null})
    }),
    {
      name: 'place-storage',
    }
  )
);