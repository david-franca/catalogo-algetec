import { apiClient } from "@/lib/axios";

import type { Demonstration } from "../schema";

export const postDemonstration = async (payload: Demonstration) => {
  const response = await apiClient.post<{ message: string }>(
    "demonstration",
    payload
  );
  return response.data;
};
