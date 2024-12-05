import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserStore = {
  loggedInUser: string | null; 
  setLoggedInUser: (user: string) => void;
  clearLoggedInUser : () => void;

};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
        loggedInUser: null,
        setLoggedInUser: (user) => set({ loggedInUser: user }),
        clearLoggedInUser: ()=>set({loggedInUser:null}), 
    }),
    {
      name: 'logged-in-user',
    }
  )
);