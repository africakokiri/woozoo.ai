import { create } from "zustand";

type FirstRenderStore = {
  isFirstRender: boolean;

  finishFirstRender: () => void;
};

export const useFirstRenderStore = create<FirstRenderStore>((set) => ({
  isFirstRender: true,

  finishFirstRender: () => set(() => ({ isFirstRender: false }))
}));
