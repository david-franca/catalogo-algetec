import { Key } from "react";
import { Meta } from "./meta";

export interface Document {
  id: number;
  name: string;
  experiment_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentMeta {
  data: Document[];
  meta: Meta;
}

export type DocumentCreate = Pick<
  Document,
  "name" | "content" | "experiment_id"
>;

export type DocumentUpdate = Partial<DocumentCreate>;

export interface DocumentList {
  key: Key;
  id: number;
  name: string;
  content: string;
}
