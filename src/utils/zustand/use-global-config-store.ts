import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalConfigStore = {
  isFirstRender: boolean;
  finishFirstRender: () => void;

  isHydrated: boolean;
  setIsHydrated: (state: boolean) => void;
};

const TITLE_SYSTEM_PROMPT = `
You are a title generator for chat sessions.
Summarize the user's input into a concise title.
Rules:
- Maximum 10 characters (Korean) or 6 words (English)
- Do not include punctuation
- Do not include quotation marks
- Only output the title text
`;

export const useGlobalConfigStore = create<GlobalConfigStore>()(
  persist(
    (set, get) => ({
      isFirstRender: true,
      finishFirstRender: () => set(() => ({ isFirstRender: false })),

      isHydrated: false,
      setIsHydrated: (state: boolean) => set({ isHydrated: state })
    }),
    {
      name: "global-config",
      partialize: () => ({}),
      onRehydrateStorage: (state) => () => state.setIsHydrated(true)
    }
  )
);
