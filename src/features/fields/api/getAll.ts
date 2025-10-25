import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

import { FieldSchema } from "../schemas";

export const getFields = async () => {
  const response = await apiClient.get("fields/all");

  return FieldSchema.parse(response.data);
};

export const fieldQueryOptions = (language: string) =>
  queryOptions({
    queryKey: ["all-fields-raw", language],
    queryFn: getFields,
    placeholderData: keepPreviousData,
  });
