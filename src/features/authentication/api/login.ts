import { apiClient } from "@/lib/axios";

import {
  LoginResponseSchema,
  type LoginFormData,
  type LoginResponse,
} from "../schemas";

export const loginRequest = async (
  data: LoginFormData
): Promise<LoginResponse> => {
  const response = await apiClient.post("/login", data);
  return LoginResponseSchema.parse(response.data);
};
