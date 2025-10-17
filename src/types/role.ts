export interface Role {
  id: number;
  name: string;
  assets: boolean;
  admin: boolean;
  demands: boolean;
  created_at: string;
  updated_at: string;
  demands_admin: boolean;
  demands_leader: boolean;
  checklists: boolean;
  releases: boolean;
  issues: boolean;
  super_admin: boolean;
}
