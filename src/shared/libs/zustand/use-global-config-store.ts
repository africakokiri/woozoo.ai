import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalConfig = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useGlobalConfigStore = create<GlobalConfig>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
    }),
    {
      name: "is-sidebar-open",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
