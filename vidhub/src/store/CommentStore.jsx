import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create((persist(
    (set) => ({
        comments:[],
        addcomment:(com) => set((state) => ({ comments : [...state.comments , com]})),
        clearcomment : () => set({ comments : []}),
    }),
    {
        name:"comment",
        getStorage : () => localStorage,
    }
)))