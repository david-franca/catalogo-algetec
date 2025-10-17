import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AssistantState {
  coding_activity?: boolean;
  coding_range?: [number, number];
  coding_responsible?: number;
  daysCount?: number;
  designing_activity?: boolean;
  designing_range?: [number, number];
  designing_responsible?: number;
  finished_at?: string;
  modeling_activity?: boolean;
  modeling_range?: [number, number];
  modeling_responsible?: number;
  scripting_activity?: boolean;
  scripting_range?: [number, number];
  scripting_responsible?: number;
  testing_activity?: boolean;
  testing_range?: [number, number];
  testing_responsible?: number;
  ualab_activity?: boolean;
  ualab_range?: [number, number];
  ualab_responsible?: number;
}

interface AssistantStore {
  assistant: AssistantState;
  updateAssistant: (assistant: AssistantState) => void;
}

export const useAssistant = create(
  persist<AssistantStore>(
    (set) => ({
      assistant: {
        coding_activity: false,
        coding_range: [0, 0],
        daysCount: 30,
        designing_activity: false,
        designing_range: [0, 0],
        modeling_activity: false,
        modeling_range: [0, 0],
        scripting_activity: false,
        scripting_range: [0, 0],
        testing_activity: false,
        testing_range: [0, 0],
        ualab_activity: false,
        ualab_range: [0, 0],
      },
      updateAssistant: (assistant: AssistantState) => {
        set({ assistant });
      },
    }),
    {
      name: "assistant-storage",
    }
  )
);
