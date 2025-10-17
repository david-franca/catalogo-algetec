import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { create } from "zustand";

import { ISSUES_STATUS } from "@/types/issue";
import { PRIORITY } from "@/utils/handlePriority";

interface IssueCreateFormProps {
  experiment_id: string;
  responsible_id: number;
  version: string;
  problems: {
    [x: string]: {
      status: ISSUES_STATUS;
      problem: string;
      description?: string;
      priority: PRIORITY;
      tags?: number[];
      files?: UploadFile<RcFile>[];
    };
  };
}

interface IssueCreateFormState {
  formValues: IssueCreateFormProps;
  setForm: (form: IssueCreateFormProps) => void;
}

export const useIssueCreateForm = create<IssueCreateFormState>((set) => ({
  formValues: {} as IssueCreateFormProps,
  setForm: (formValues) => set({ formValues }),
}));
