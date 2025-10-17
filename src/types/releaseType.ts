export interface ReleaseType {
  id: number;
  name: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface ReleaseTypeUpdate {
  id: number;
  color?: string;
  name?: string;
}

export type ReleaseTypeCreate = Pick<ReleaseType, "color" | "name">;
