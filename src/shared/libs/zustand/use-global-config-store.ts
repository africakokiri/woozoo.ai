import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalConfig = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  isHydrated: boolean;
  setIsHydrated: () => void;
};

export const useGlobalConfigStore = create<GlobalConfig>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      isHydrated: false,
      setIsHydrated: () => set(() => ({ isHydrated: true }))
    }),
    {
      name: "is-sidebar-open",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated();
      }
    }
  )
);
