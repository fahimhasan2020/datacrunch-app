import { create } from 'zustand';

const useAuthStore = create((set) => ({
  loggedIn: false,
  setLoggedIn: (value:boolean) => set({ loggedIn: value }),
}));

export default useAuthStore;
