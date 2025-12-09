import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FirstRenderStore = {
  isFirstRender: boolean;

  finishFirstRender: () => void;
};

export const useFirstRenderStore = create<FirstRenderStore>((set) => ({
  isFirstRender: true,

  finishFirstRender: () => set(() => ({ isFirstRender: false }))
}));

type GlobalConfigStore = {
  isSidebarOpen: boolean;

  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    (set, get) => ({
      isSidebarOpen: false,

      setIsSidebarOpen: () => ({ isSidebarOpen: !get().isSidebarOpen })
    }),
    {
      name: "open-sidebar",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
