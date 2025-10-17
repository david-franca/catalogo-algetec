import { Permissions } from "./permissions";
import { User } from "./user";

export interface Token {
  type: string;
  token: string;
}

export interface LoginApiResponse {
  user: User[];
  token: Token;
  permissions: Permissions;
}
