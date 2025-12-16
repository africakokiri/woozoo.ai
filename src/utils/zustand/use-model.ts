import { type MODELS_GOOGLE } from "@/constants/models";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type MODELS_GOOGLE = (typeof MODELS_GOOGLE)[number]["id"];

type ModelStore = {
  model: MODELS_GOOGLE;
  setModel: (selectedModel: MODELS_GOOGLE) => void;
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
