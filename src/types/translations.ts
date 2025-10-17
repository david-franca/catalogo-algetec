import { RcFile } from "antd/es/upload";

export interface CreateUnity {
  experiment_id: string;
  language: string;
  version: string;
  file: RcFile;
}
