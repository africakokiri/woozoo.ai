import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalConfigStore = {
  isFirstRender: boolean;
  finishFirstRender: () => void;

  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;
};

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    (set, get) => ({
      isFirstRender: true,
      finishFirstRender: () => set(() => ({ isFirstRender: false })),

      isHydrated: false,
      setIsHydrated: () => set({ isHydrated: !get().isHydrated })
    }),
    {
      name: "global-config",
      onRehydrateStorage: (state) => () => state.setIsHydrated(true)
    }
  )
);
