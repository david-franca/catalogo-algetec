import { Demand } from "./demand";
import { Issue } from "./issue";
import { Meta } from "./meta";
import { Release, ReleaseType } from "./release";
import { User } from "./user";

export enum ExperimentStatus {
  new = 0,
  beta = 1,
  available = 2,
  unavailable = 3,
}

export type Experiment = {
  issueCounts?: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  id: string;
  field_id: number;
  original_experiment_id?: string | null;
  name: string;
  description: string;
  image?: string;
  web: boolean;
  pt: boolean;
  en: boolean;
  es: boolean;
  android: boolean;
  ios: boolean;
  status: ExperimentStatus;
  created_at: string;
  updated_at: string;
  test: string;
  approved: boolean;
};

export type ExperimentsWithIssues = Experiment & {
  issues: Issue[];
};

export interface ExperimentsMeta {
  data: Experiment[];
  meta: Meta;
}

export type ExperimentDocument = {
  content: string;
  created_at: Date;
  experiment_id: string;
  id: number;
  name: string;
  updated_at: Date;
  user_id: number;
};

export type ExperimentDemand = Omit<
  Demand,
  "experiments" | "demandLogs" | "description"
>;
export type ExperimentIssue = Omit<Issue, "experiment" | "issueComments">;
export type ExperimentRelease = Omit<Release, "experiment">;
export type ExperimentReleaseResponse = Omit<
  Release,
  "releaseType" | "experiment"
> & {
  releaseType: ReleaseType;
};

export interface ExperimentShowResponse extends Experiment {
  onlyExistACardinLastColumn?: boolean;
  templates: ExperimentDocument[] | null;
  demands: ExperimentDemand[];
  issues: ExperimentIssue[];
  releases: ExperimentReleaseResponse[];
  experiments: Experiment[];
  latest_english_release?: ExperimentRelease;
  latest_spanish_release?: ExperimentRelease;
  latest_android_release?: ExperimentRelease;
  latest_webgl_release?: ExperimentRelease;
  en_version: string;
  es_version: string;
  files: {
    id: number;
    user_id: number;
    experiment_id: string;
    name: string;
    link: string;
    created_at: string;
    updated_at: string;
    user: User;
  }[];
}

export interface ExperimentShow extends Experiment {
  demands: ExperimentDemand[];
  onlyExistACardinLastColumn?: boolean;
  templates: ExperimentDocument[];
  issues: ExperimentIssue[];
  releases: ExperimentRelease[];
  experiments: Experiment[];
  latest_english_release?: ExperimentRelease;
  latest_spanish_release?: ExperimentRelease;
  latest_android_release?: ExperimentRelease;
  latest_webgl_release?: ExperimentRelease;
  en_version: string;
  es_version: string;
  files: {
    id: number;
    user_id: number;
    experiment_id: string;
    name: string;
    link: string;
    created_at: string;
    updated_at: string;
    user: User;
  }[];
}
