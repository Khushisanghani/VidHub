import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useVideoStore = create(persist(
    (set) => ({
        videos:[],
        addVideo:(video) => set((state) => ({ videos : [...state.videos,video]})),
        clearVideos : () => set({ videos : []}),
    }),
    {
        name:"video-storage",
        getStorage : () => localStorage,
    }
))