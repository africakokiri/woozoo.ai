import { create } from "zustand";

type GlobalDataStore = {
  prompt: string;
  setPrompt: (prompt: string) => void;
};

export const useGlobalDataStore = create<GlobalDataStore>()((set) => ({
  prompt: "",
  setPrompt: (prompt) => set(() => ({ prompt }))
}));
