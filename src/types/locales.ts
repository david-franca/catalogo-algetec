import { User } from "./user";

export interface LocalePair {
  id: number;
  locale_id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface Locale {
  id: number;
  experiment_id: string;
  user_id: number;
  name: string;
  version: string;
  language: string;
  created_at: string;
  updated_at: string;
  localePairs: LocalePair[];
  user: Omit<User, "role" | "department">;
}

export interface LocaleCreate {
  data: {
    language: string;
    experiment_id: string;
    version?: string;
    content: {
      [key: string]: string;
    }[];
  }[];
}

export type FormLocale = Locale & {
  originalPairs: LocalePair[];
};
