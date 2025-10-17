import { Department } from "./department";
import { Role } from "./role";

export interface User {
  id: number;
  email: string;
  role_id: number;
  department_id: number;
  name: string;
  remember_me_token?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  role: Role;
  department: Department;
}

export interface UserSingle {
  id: number;
  email: string;
  role_id: number;
  department_id: number;
  name: string;
  remember_me_token: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type UserCreate = Pick<
  User,
  "name" | "email" | "department_id" | "role_id"
> & {
  password: string;
  confirmPassword: string;
};

export type UserUpdate = {
  id: number;
  role_id?: string;
  department_id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
