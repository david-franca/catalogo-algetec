import { Key } from "react";

import { Locale, LocaleCreate } from "@/types/locales";
import { Meta } from "@/types/meta";
import { apiClient } from "@/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

import { queryClient } from "./client";

export interface LocaleList {
  key: Key;
  experiment_id: string;
  name: string;
  language: string;
  version: string;
}

export interface LocalesMeta {
  meta: Meta;
  data: Locale[];
}

export function useLocaleCreate() {
  return useMutation({
    mutationKey: ["locale-create"],
    mutationFn: async (body: LocaleCreate) => {
      return await apiClient.post("/locales/create", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locales"] }).then();
    },
  });
}

export function useLocalesList() {
  const { limit, page, experimentId, field, language, order } = useSearch({
    from: "/dashboard/locales/",
  });
  return useQuery<{ data: LocaleList[]; meta: Meta }>({
    queryKey: ["locales", limit, page, experimentId, field, language, order],
    queryFn: async () => {
      const { data } = await apiClient.get<LocalesMeta>("/v2/locales/all", {
        params: {
          limit,
          page,
          experimentId,
          field,
          language,
          order,
        },
      });

      const { meta, data: locales } = data;

      return {
        data: locales.map((locale) => ({
          key: locale.id,
          experiment_id: locale.experiment_id,
          name: locale.language,
          language: locale.language,
          version: locale.version,
          created_at: locale.created_at
        })),
        meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useLocalesShow(
  id?: number | string,
  language?: string,
  version?: string
) {
  return useQuery<Locale>({
    queryKey: ["locales", id, language, version],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data, status } = await apiClient.get<Locale[]>(
        `/locales/showUnity/${id}_${language?.toLowerCase()}.csv`,
        {
          params: {
            json: true,
            version,
          },
        }
      );

      if (status === 404) {
        throw new Error("Locale not found");
      }

      return data[0];
    },
    refetchOnWindowFocus: false,
  });
}

export function useLocationMassShow(ids: Key[]) {
  return useQuery<Locale[]>({
    queryKey: ["mass-locale", ...ids],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Locale[]>("/locales/showMass", {
        params: {
          id: ids.map((id) => id.toString()),
          json: true,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      return data;
    },
  });
}
