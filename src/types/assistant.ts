import { Dayjs } from "dayjs";
import { IScheduleResponse } from "./schedule";

export interface AssistantValues {
  coding_activity: boolean;
  coding_finish: number;
  coding_range: [number, number];
  coding_start: number;
  datetime?: Dayjs;
  designing_activity: boolean;
  designing_finish: number;
  designing_range: [number, number];
  designing_start: number;
  modeling_activity: boolean;
  modeling_finish: number;
  modeling_range: [number, number];
  modeling_start: number;
  scripting_activity: boolean;
  scripting_finish: number;
  scripting_range: [number, number];
  scripting_start: number;
  testing_activity: boolean;
  testing_finish: number;
  testing_range: [number, number];
  testing_start: number;
  ualab_activity: boolean;
  ualab_finish: number;
  ualab_range: [number, number];
  ualab_start: number;
  coding_developer?: number;
  designing_developer?: number;
  modeling_developer?: number;
  scripting_developer?: number;
  testing_developer?: number;
  ualab_developer?: number;
}

export interface AssistantEdit {
  datetime?: Dayjs;
  ualab_developer?: number;
  coding_developer?: number;
  testing_developer?: number;
  modeling_developer?: number;
  scripting_developer?: number;
  designing_developer?: number;
}

type AssistantResponse = {
  schedule: IScheduleResponse;
  skips: string[];
  developer: number;
  message: string;
};

export interface Result {
  ualab?: AssistantResponse;
  coding?: AssistantResponse;
  scripting?: AssistantResponse;
  modeling?: AssistantResponse;
  testing?: AssistantResponse;
  designing?: AssistantResponse;
}
