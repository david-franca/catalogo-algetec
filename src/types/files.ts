import { Department } from "./department";
import { User } from "./user";

export interface Files {
  id: number;
  demand_id: number;
  department_id: number;
  user_id: number;
  name: string;
  link: string;
  created_at: string;
  updated_at: string;
  department: Department;
  user: User;
}
