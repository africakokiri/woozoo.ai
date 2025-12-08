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
  _hasHydrated: boolean;

  setIsSidebarOpen: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isSidebarOpen: true,
      _hasHydrated: false,

      setIsSidebarOpen: () => set({ isSidebarOpen: !get().isSidebarOpen }),
      setHasHydrated: (state) => set({ _hasHydrated: state })
    }),
    {
      name: "open-sidebar",
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      }
    }
  )
);
