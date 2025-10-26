import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModeViewState {
  viewMode: "list" | "grid";
}

interface ModeViewActions {
  setViewMode: (mode: ModeViewState["viewMode"]) => void;
}

type ModeViewStore = ModeViewState & ModeViewActions;

export const useModeView = create(
  persist<ModeViewStore>(
    (set) => ({
      viewMode: "list",
      setViewMode: (viewMode) => set({ viewMode }),
    }),
    {
      name: "mode-view-storage",
    }
  )
);
