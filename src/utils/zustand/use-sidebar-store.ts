import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;

  isSidebarRendered: boolean;
  setIsSidebarRendered: () => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      toggle: () => set({ isOpen: !get().isOpen }),

      isSidebarRendered: false,
      setIsSidebarRendered: () => set({ isSidebarRendered: true })
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
