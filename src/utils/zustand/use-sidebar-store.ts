import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      toggle: () => set({ isOpen: !get().isOpen })
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
