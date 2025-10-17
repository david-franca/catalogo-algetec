import { Key, ReactNode } from "react";

export interface ChecklistParams {
  checked: boolean;
  key: number;
  name: string;
  percentage: number;
}

export interface ChecklistSelectProps {
  name?: string;
  params?: ChecklistParams[];
  id?: number;
  checked?: boolean;
  key?: number;
  index?: number;
}

export interface Checklist {
  id: number;
  name: string;
  departments: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    checklist_id: number;
  }[];
  checklist_parameters: {
    id: number;
    checklist_id: number;
    name: string;
    percentage: number;
    checked?: boolean;
    created_at: string;
    updated_at: string;
    order: number;
    checklist_parameters: Checklist["checklist_parameters"][];
  }[];
}

export interface ChecklistList {
  key: Key;
  id: number;
  name: string;
  departments: string[];
}

export interface EditableCellProps<T> {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
}

export interface ChecklistCreate {
  name: string; // maxLength 255
  department_ids: number[];
  parameters: Array<{
    id?: number;
    name: string;
    percentage: number;
    checked: boolean;
    order: number;
    subItems?: Array<{
      name: string;
      percentage: number;
      checked: boolean;
      order: number;
    }>;
  }>;
}

export type ChecklistUpdate = Partial<ChecklistCreate> & {
  id: number;
};
