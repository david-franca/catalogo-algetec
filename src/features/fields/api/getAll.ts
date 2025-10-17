import { apiClient } from "@/lib/axios";
import { FieldSchema } from "../schemas";

export const getFields = async () => {
  const response = await apiClient.get("fields/all");

  return FieldSchema.parse(response.data);
};
