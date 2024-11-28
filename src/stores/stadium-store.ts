import { StadiumType } from '@/types/stadium';
import { create } from 'zustand';

export type Stadium = StadiumType

export type StadiumStore = {
  selectedStadium: Stadium | null; 
  setSelectedStadium: (stadium: Stadium) => void; 
  clearSelectedStadium: () => void; 
};

export const useStadiumStore = create<StadiumStore>((set) => ({
  selectedStadium: null,
  setSelectedStadium: (stadium) => set({ selectedStadium: stadium }),
  clearSelectedStadium: () => set({ selectedStadium: null }),
}));