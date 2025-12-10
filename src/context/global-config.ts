import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalConfigStore = {
  isFirstRender: boolean;
  finishFirstRender: () => void;

  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;

  isSidebarRendered: boolean;
  setIsSidebarRendered: () => void;
};

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    (set, get) => ({
      isFirstRender: true,
      finishFirstRender: () => set(() => ({ isFirstRender: false })),

      isHydrated: false,
      setIsHydrated: () => set({ isHydrated: !get().isHydrated }),

      isSidebarRendered: false,
      setIsSidebarRendered: () => set({ isSidebarRendered: true })
    }),
    {
      name: "open-sidebar",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: (state) => () => state.setIsHydrated(true)
    }
  )
);
