import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalConfigStore = {
  isFirstRender: boolean;
  finishFirstRender: () => void;

  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;

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

      isSidebarOpen: true,
      setIsSidebarOpen: () => set({ isSidebarOpen: !get().isSidebarOpen }),

      isSidebarRendered: false,
      setIsSidebarRendered: () => set({ isSidebarRendered: true })
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

type ModelStore = {
  model: string;
  setModel: (selectedModel: string) => void;
};

export const useModelStore = create<ModelStore>()(
  persist(
    (set) => ({
      model: "gemini-2.5-flash-lite",
      setModel: (selectedModel) => set({ model: selectedModel })
    }),
    {
      name: "selected-model"
    }
  )
);
