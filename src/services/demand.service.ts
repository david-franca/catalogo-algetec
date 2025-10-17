import dayjs from "dayjs";
import { Key } from "react";

import {
  CreateDemandLog,
  DemandData,
  DemandFiles,
  DemandShow,
  DemandStatus,
  DemandTags,
} from "@/types/demand";
import { Meta } from "@/types/meta";
import { ISchedule } from "@/types/schedule";
import { SelectOptions } from "@/types/select";
import { apiClient } from "@/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

import { queryClient } from "./client";

export interface DemandList {
  key: Key;
  id: number;
  experiment_id: string;
  experiment: string;
  client: string;
  status: DemandStatus;
  scripting: string;
  modeling: string;
  coding: string;
  testing: string;
  ualab: string;
  designing: string;
  created_at: string;
  updated_at: string;
  finished_at: string;
  tags: string[];
  author: string;
}

export function useDemandList() {
  const {
    page,
    limit,
    experimentId,
    experiment,
    finishedAtEnd,
    finishedAtStart,
    institutions,
    field,
    order,
    author,
    coding,
    designing,
    modeling,
    scripting,
    status,
    tags,
    testing,
    ualab,
  } = useSearch({
    from: "/dashboard/demands/",
  });

  return useQuery<{ data: DemandList[]; meta: Meta }>({
    queryKey: [
      "demands",
      page,
      limit,
      experimentId,
      experiment,
      finishedAtEnd,
      finishedAtStart,
      institutions,
      field,
      order,
      author,
      coding,
      designing,
      modeling,
      scripting,
      status,
      tags,
      testing,
      ualab,
    ],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const params = {
        page,
        limit,
        experimentId,
        experiment,
        institution: institutions,
        finishedAtEnd: finishedAtEnd
          ? dayjs(finishedAtEnd, "DD-MM-YYYY").toISOString()
          : undefined,
        finishedAtStart: finishedAtStart
          ? dayjs(finishedAtStart, "DD-MM-YYYY").toISOString()
          : undefined,
        field,
        order,
        author,
        codingDeveloper: coding,
        designingDeveloper: designing,
        modelingDeveloper: modeling,
        scriptingDeveloper: scripting,
        status,
        tags,
        testingDeveloper: testing,
        ualabDeveloper: ualab,
      };

      const {
        data: { data, meta },
      } = await apiClient.get<DemandData>("/demands/all", {
        params,
      });

      return {
        meta,
        data: data.map((demand) => ({
          key: demand.id,
          id: demand.id,
          experiment_id: demand.experiment_id,
          experiment: demand.experiments.name,
          client: demand.institutions.name,
          status: demand.status,
          scripting:
            demand.latest_scripting_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          modeling:
            demand.latest_modeling_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          coding:
            demand.latest_coding_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          testing:
            demand.latest_testing_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          ualab:
            demand.latest_ualab_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          designing:
            demand.latest_designing_log?.demandLog_developers
              .map((el) => el.name.trim())
              .sort((a, b) => a.localeCompare(b))
              .join(", ") || "",
          created_at: demand.created_at,
          updated_at: demand.updated_at,
          tags: demand.demandTags?.map((tag) => tag.name) || [],
          finished_at: demand.finished_at,
          author: demand.creator?.name || "---",
        })),
      };
    },
  });
}

export function useDemandDelete() {
  return useMutation({
    mutationKey: ["demand-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/demands/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demands"] });
    },
  });
}

export function useDemandTags() {
  return useQuery<SelectOptions[]>({
    queryKey: ["demand-tags"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<DemandTags[]>("/demandTags/all");
      return data.map((tag) => ({
        value: tag.name,
        label: tag.name,
      }));
    },
  });
}

export function useDemand(id?: number | string) {
  return useQuery({
    queryKey: ["demands", id],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<DemandShow>(`/demands/show/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useCreateDemandLog() {
  return useMutation({
    mutationKey: ["demand-log"],
    mutationFn: async (data: CreateDemandLog) => {
      await apiClient.post("/demands/createLog", data);
    },
  });
}

export function useInactiveLogById() {
  return useMutation({
    mutationKey: ["inactive-log"],
    mutationFn: async (body: { id: number; active: boolean }) => {
      await apiClient.put(`/demands/byLog/${body.id}`, body);
    },
  });
}

export function useDemandByUser(id?: number | string) {
  return useQuery<ISchedule[]>({
    queryKey: ["demand-by-user", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ISchedule[]>(
        `/demands/byUser/${id}`
      );
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useDemandFileDelete() {
  return useMutation({
    mutationKey: ["demand-file-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/demandFiles/delete/${id}`);
    },
  });
}

export function useDemandFile(id?: number | string) {
  return useQuery<{ url: string }>({
    queryKey: ["demand-file", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ url: string }>(
        `/demandFiles/getUrl/${id}`
      );
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useDemandFileList() {
  return useQuery<DemandFiles[]>({
    queryKey: ["demand-file-list"],
    queryFn: async () => {
      const { data } = await apiClient.get<DemandFiles[]>(`/demandFiles/all`);
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useDemandUpdate(id?: number | string) {
  return useMutation({
    mutationKey: ["demand-update"],
    mutationFn: async (data: FormData) => {
      await apiClient.put(`/demands/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
}

export function useDemandCreate() {
  return useMutation({
    mutationKey: ["demand-create"],
    mutationFn: async (data: FormData) => {
      await apiClient.post("/demands/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
}
