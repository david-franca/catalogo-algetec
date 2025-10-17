import { Dayjs } from "dayjs";
import { ExperimentsWithIssues } from "./experiment";
import { Files } from "./files";
import { Institution } from "./institution";
import { Meta } from "./meta";
import { SelectOptions } from "./select";
import { User } from "./user";
import { ChecklistUpdate } from "./checklist";
import { RcFile } from "antd/es/upload";

export enum DemandStatus {
  DEVELOPMENT = "Desenvolvimento",
  VALIDATION = "Validação",
  CORRECTION = "Correção",
  READY = "Pronto",
  REVALIDATION = "Revalidação",
}

export interface DemandTags {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  demands: Omit<
    Demand,
    "experiments" | "institutions" | "demandLogs" | "demandTags"
  >[];
}

type Logger = {
  id: number;
  email: string;
  role_id: number;
  department_id: number;
  name: string;
  remember_me_token: null;
  created_at: string;
  updated_at: string;
};

export interface DemandChecklist {
  id: number;
  name: string;
  demand_checklist_parameters: {
    id: number;
    checklist_id: number;
    name: string;
    percentage: number;
    checked: boolean;
    created_at: string;
    updated_at: string;
    order: number;
    demand_checklist_parameters: DemandChecklist["demand_checklist_parameters"];
  }[];
}

export type DemandLog = {
  id: number;
  demand_id: number;
  logger_id: number;
  type: string;
  progress: number;
  deadline: number;
  started_at: string;
  finished_at: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  checklist_id: number;
  logger: Logger;
  demandLog_developers: Omit<User, "role" | "department">[];
  checklist: DemandChecklist;
};

export interface Demand {
  id: number;
  experiment_id: string;
  institution_id: number;
  status: DemandStatus;
  scripting: number;
  modeling: number;
  coding: number;
  testing: number;
  ualab: number;
  created_at: string;
  updated_at: string;
  finished_at: string;
  created_by_id?: string | null;
  designing: number;
  latest_scripting_log_id: number | null;
  latest_modeling_log_id: number | null;
  latest_coding_log_id: number | null;
  latest_testing_log_id: number | null;
  latest_ualab_log_id: number | null;
  latest_designing_log_id: number | null;
  institutions: Omit<Institution, "demands">;
  demandTags?: DemandTags[];
  files: Files[];
  latest_scripting_log: DemandLog | null;
  latest_modeling_log: DemandLog | null;
  latest_testing_log: DemandLog | null;
  latest_designing_log: DemandLog | null;
  experiments: ExperimentsWithIssues;
  creator?: User;
  latest_coding_log: DemandLog | null;
  latest_ualab_log: DemandLog | null;
}

export interface DemandShow {
  id: number;
  institution_id: number;
  status: string;
  scripting: number;
  modeling: number;
  coding: number;
  testing: number;
  ualab: number;
  created_at: string;
  updated_at: string;
  finished_at: string;
  created_by_id: number;
  designing: number;
  latest_scripting_log_id?: number;
  latest_modeling_log_id?: number;
  latest_coding_log_id?: number;
  latest_testing_log_id?: number;
  latest_ualab_log_id?: number;
  latest_designing_log_id?: number;
  done_at: string;
  experiment_id: string;
  institutions: Omit<Institution, "demands">;
  demandTags?: DemandTags[];
  files: Files[];
  latest_scripting_log?: DemandLog;
  latest_modeling_log?: DemandLog;
  latest_ualab_log?: DemandLog;
  latest_designing_log?: DemandLog;
  experiments: ExperimentsWithIssues;
  creator: User;
  latest_coding_log?: DemandLog;
  latest_testing_log?: DemandLog;
  demandLogs: DemandLog[];
  chart: Chart;
}

export interface DemandData {
  meta: Meta;
  data: Demand[];
}

export interface Chart {
  idealBurn: IdealBurn[];
  actualBurn: ActualBurn[];
  idealSpeed: number;
  actualSpeed: number;
}

export interface IdealBurn {
  x: string;
  y_remainingWork: number;
}

export interface ActualBurn {
  x: string;
  y_remainingWork: number;
}

export type CreateDemandLog = {
  type: string;
  demand_id: number;
  logger_id: number;
  deadline: number;
  developers: number[];
  active: boolean;
  finishedAt: string;
  createdAt: string;
  progress: number;
};

export type TeamLog =
  | "Coding"
  | "Testing"
  | "Scripting"
  | "Modeling"
  | "Ualab"
  | "Designing";

export interface DemandUpdateForm {
  coding?: number;
  coding_checklist?: DemandChecklist;
  coding_deadline?: number;
  coding_developers?: SelectOptions[];
  coding_files?: Files[];
  coding_finishedAt?: Dayjs;
  coding_message?: string;
  coding_percent?: number;
  coding_startedAt?: Dayjs;
  demandTags?: DemandTags[];
  experiment_id: string;
  id: number;
  institution_id: number;
  logger_id: number;
  modeling?: number;
  modeling_checklist?: DemandChecklist;
  modeling_deadline?: number;
  modeling_developers?: SelectOptions[];
  modeling_files?: Files[];
  modeling_finishedAt?: Dayjs;
  modeling_message?: string;
  modeling_percent?: number;
  modeling_startedAt?: Dayjs;
  scripting?: number;
  scripting_checklist?: DemandChecklist;
  scripting_deadline?: number;
  scripting_developers?: SelectOptions[];
  scripting_files?: Files[];
  scripting_finishedAt?: Dayjs;
  scripting_message?: string;
  scripting_percent?: number;
  scripting_startedAt?: Dayjs;
  status: DemandStatus;
  testing?: number;
  testing_checklist?: DemandChecklist;
  testing_deadline?: number;
  testing_developers?: SelectOptions[];
  testing_files?: Files[];
  testing_finishedAt?: Dayjs;
  testing_message?: string;
  testing_percent?: number;
  testing_startedAt?: Dayjs;
  ualab?: number;
  ualab_checklist?: DemandChecklist;
  ualab_deadline?: number;
  ualab_developers?: SelectOptions[];
  ualab_files?: Files[];
  ualab_finishedAt?: Dayjs;
  ualab_message?: string;
  ualab_percent?: number;
  ualab_startedAt?: Dayjs;
  designing?: number;
  designing_checklist?: DemandChecklist;
  designing_deadline?: number;
  designing_developers?: SelectOptions[];
  designing_files?: Files[];
  designing_finishedAt?: Dayjs;
  designing_message?: string;
  designing_percent?: number;
  designing_startedAt?: Dayjs;
}

export type DemandUpdate = Partial<
  Pick<Demand, "status" | "experiment_id" | "institution_id"> & {
    tags: string[];
    coding_developers: number[];
    coding_progress: number;
    coding_finishedAt: string;
    coding_deadline: number;
    coding_startedAt: string;
    coding_checklist: ChecklistUpdate;
    coding_checklist_id: number;
    coding_files: RcFile[];
    scripting_developers: number[];
    scripting_progress: number;
    scripting_finishedAt: string;
    scripting_deadline: number;
    scripting_startedAt: string;
    scripting_checklist: ChecklistUpdate;
    scripting_checklist_id: number;
    scripting_files: RcFile[];
    testing_developers: number[];
    testing_progress: number;
    testing_finishedAt: string;
    testing_deadline: number;
    testing_startedAt: string;
    testing_checklist: ChecklistUpdate;
    testing_checklist_id: number;
    testing_files: RcFile[];
    ualab_developers: number[];
    ualab_progress: number;
    ualab_finishedAt: string;
    ualab_deadline: number;
    ualab_startedAt: string;
    ualab_checklist: ChecklistUpdate;
    ualab_checklist_id: number;
    ualab_files: RcFile[];
    modeling_developers: number[];
    modeling_progress: number;
    modeling_finishedAt: string;
    modeling_deadline: number;
    modeling_startedAt: string;
    modeling_checklist: ChecklistUpdate;
    modeling_checklist_id: number;
    modeling_files: RcFile[];
    designing_developers: number[];
    designing_progress: number;
    designing_finishedAt: string;
    designing_deadline: number;
    designing_startedAt: string;
    designing_checklist: ChecklistUpdate;
    designing_checklist_id: number;
    designing_files: RcFile[];
  }
> & {
  id: number;
  logger_id: number;
};

export interface DemandFiles {
  id: number;
  demand_id: number;
  department_id: number;
  user_id: number;
  link: string;
  created_at: string;
  updated_at: string;
  department?: null;
  user: User;
}

export type DemandCreate = Pick<
  Demand,
  "status" | "experiment_id" | "institution_id"
> & {
  coding_checklist_id?: number;
  coding_deadline?: number;
  coding_developers?: number[];
  coding_finishedAt?: string;
  coding_startedAt?: string;
  logger_id: number;
  modeling_checklist_id?: number;
  modeling_deadline?: number;
  modeling_developers?: number[];
  modeling_finishedAt?: string;
  modeling_startedAt?: string;
  scripting_checklist_id?: number;
  scripting_deadline?: number;
  scripting_developers?: number[];
  scripting_finishedAt?: string;
  scripting_startedAt?: string;
  tags?: string[];
  testing_checklist_id?: number;
  testing_deadline?: number;
  testing_developers?: number[];
  testing_finishedAt?: string;
  testing_startedAt?: string;
  ualab_checklist_id?: number;
  ualab_deadline?: number;
  ualab_developers?: number[];
  ualab_finishedAt?: string;
  ualab_startedAt?: string;
  designing_checklist_id?: number;
  designing_deadline?: number;
  designing_developers?: number[];
  designing_finishedAt?: string;
  designing_startedAt?: string;
};
