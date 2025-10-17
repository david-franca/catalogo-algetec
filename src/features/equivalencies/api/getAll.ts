import { apiClient } from "@/lib/axios";

export const getEquivalencies = async () => {
  const response = await apiClient.get("fields/all");
  return response.data;
};
