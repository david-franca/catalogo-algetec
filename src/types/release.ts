import { Key } from "react";
import { Meta } from "./meta";

export interface ReleaseType {
  name: string;
  id: number;
  color: string;
}

export interface Release {
  id: number;
  experiment_id: string;
  version: string;
  user_id: number;
  created_at: string;
  experiment: {
    id: string;
    name: string;
  };
  author: {
    email: string;
    name: string;
    id: number;
  };
  releaseType: ReleaseType[];
  updated_at: string;
  id_0: boolean;
  id_5000: boolean;
  id_6000: boolean;
  play_store: boolean;
  languages: boolean;
  description: string;
  platform_a: boolean;
}

export type ReleaseResponse = Omit<Release, "releaseType"> & {
  releaseType: ReleaseType;
};

export type ReleaseCreate = Pick<
  Release,
  "user_id" | "version" | "experiment_id" | "description"
> & {
  releaseTypes: number[];
};

export type ReleaseUpdate = Partial<
  Pick<
    Release,
    | "id_0"
    | "id_5000"
    | "id_6000"
    | "play_store"
    | "languages"
    | "description"
    | "platform_a"
  > & {
    releaseTypes: number[];
  }
>;

export interface ReleaseMeta {
  data: Release[];
  meta: Meta;
}

export interface ReleaseList {
  data: ReleaseDataType[];
  meta: Meta;
}

export interface ReleaseDataType {
  key: Key;
  id: number;
  name: string;
  type: {
    name: string;
    id: number;
    color?: string;
  }[];
  version: string;
  created_at: string;
  author: string;
  id_0: boolean;
  id_5000: boolean;
  id_6000: boolean;
  play_store: boolean;
  languages: boolean;
  experiment_id: string;
  platform_a: boolean;
  description: string;
}
