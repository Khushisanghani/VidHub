// store/userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData, token) => {
        localStorage.setItem("token", token); 
        set({ user: userData, token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
