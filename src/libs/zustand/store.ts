import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModelStore = {
  model: string;

  setModel: (model: string) => void;
};

export const useModelStore = create<ModelStore>()(
  persist(
    (set) => ({
      model: "gemini-2.5-flash",

      setModel: (model) => set({ model })
    }),
    {
      name: "selected-model"
    }
  )
);

type SidebarStore = {
  isSidebarOpen: boolean;

  setIsSidebarOpen: () => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isSidebarOpen: true,

      setIsSidebarOpen: () => set({ isSidebarOpen: !get().isSidebarOpen })
    }),
    {
      name: "open-sidebar"
    }
  )
);
