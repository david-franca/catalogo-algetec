import { Key } from "react";
import { Experiment } from "./experiment";
import { Meta } from "./meta";
import { User } from "./user";
import { PRIORITY } from "@/utils/handlePriority";

export interface IssueComment {
  id: number;
  type: string;
  comment: string;
  issue_id: number;
  issue: Issue;
  user_id: number | null;
  user: User | null;
  created_at: string;
  updated_at: string;
}

export interface IssueFile {
  id: number;
  name: string;
  link: string;
  user_id: number | null;
  user: User | null;
  issue_id: number;
  issue: Issue;
  createdAt: string;
  updatedAt: string;
}

export interface IssueTag {
  id: number;
  name: string;
  issues: Issue[];
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: number;
  problem: string;
  priority: number;
  version: string;
  status: string;
  description: string;
  experiment_id: string;
  approved: boolean;
  experiment: Experiment;
  created_by_id: number;
  creator: User;
  responsible_id: number;
  responsible: User;
  issueComments: IssueComment[];
  issueFiles: IssueFile[];
  issueTags: IssueTag[];
  created_at: string;
  updated_at: string;
}

export enum ISSUES_STATUS {
  NEW = "Novo",
  IS_NOT_ERROR = "Não é erro",
  NO_REMOVE = "Não será removido",
  DUPLICATE = "Duplicado",
  RESOLVED = "Resolvido",
}

export interface IssueMeta {
  data: Issue[];
  meta: Meta;
}

export interface IssueList {
  key: Key;
  id: number;
  problem: string;
  priority: number;
  version: string;
  status: string;
  description: string;
  experiment_id: string;
  approved: boolean;
  created_by_id: number;
  creator: string;
  responsible_id: number;
  responsible: string;
  issueTags: string[];
  created_at: string;
  updated_at: string;
}

export interface IssuesUpdate {
  status?: ISSUES_STATUS;
  experiment_id?: string;
  /**
   * Só demands_leader e admin podem editar approved
   */
  approved?: boolean;
  responsible_id?: string;
  problem?: string;
  description?: string;
  tags?: string[];
  priority?: PRIORITY;
}

export interface IssueCommentsCreate {
  issue_id: number; // id da issue a qual o comentário vai pertencer
  comment: string;
}
