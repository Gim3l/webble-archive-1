import create from "zustand"
import { devtools } from "zustand/middleware"

export const useStore = create((set) => ({
  currentFolder: null,
  setCurrentFolder: (id: string) => set({ currentFolder: id }),
}))
