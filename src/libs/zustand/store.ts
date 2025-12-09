import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalConfigStore = {
  isFirstRender: boolean;
  finishFirstRender: () => void;

  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    (set, get) => ({
      isFirstRender: true,
      finishFirstRender: () => set(() => ({ isFirstRender: false })),

      isHydrated: false,
      setIsHydrated: () => set({ isHydrated: !get().isHydrated }),

      isSidebarOpen: false,
      setIsSidebarOpen: () => set({ isSidebarOpen: !get().isSidebarOpen })
    }),
    {
      name: "open-sidebar",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen
      }),

      onRehydrateStorage: (state) => () => state.setIsHydrated(true)
    }
  )
);
