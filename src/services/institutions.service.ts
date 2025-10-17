import { Key } from "react";

import {
  Institution,
  InstitutionCreate,
  InstitutionUpdate,
} from "@/types/institution";
import { SelectOptions } from "@/types/select";
import { apiClient } from "@/utils/HttpClient";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "./client";

export interface InstitutionsList {
  key: Key;
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export function useInstitutionList() {
  return useQuery<InstitutionsList[]>({
    queryKey: ["institutions"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Institution[]>("/institutions/all");

      return data.map((institution) => ({
        key: institution.id,
        id: institution.id,
        name: institution.name,
        created_at: institution.created_at,
        updated_at: institution.updated_at,
      }));
    },
  });
}

export function useInstitutionCreate() {
  return useMutation({
    mutationKey: ["institution-create"],
    mutationFn: async (body: InstitutionCreate) => {
      const response = await apiClient.post<Institution>(
        "/institutions/create",
        body
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutions"] });
    },
  });
}

export function useInstitution(id?: number | string) {
  return useQuery<Institution>({
    queryKey: ["institutions", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Institution[]>(
        `/institutions/show/${id}`
      );
      return data[0];
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useInstitutionEdit() {
  return useMutation({
    mutationKey: ["institution-edit"],
    mutationFn: async (body: InstitutionUpdate) => {
      const { data } = await apiClient.put<Institution>(
        `/institutions/update/${body.id}`,
        body
      );
      return data;
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["institutions", id] });
    },
  });
}

export function useInstitutionDelete() {
  return useMutation({
    mutationKey: ["institution-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete<Institution>(`/institutions/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutions"] });
    },
  });
}

export function useInstitutionSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["institutions-select"],
    queryFn: async () => {
      const { data } = await apiClient.get<Institution[]>("/institutions/all");
      return data.map((institution) => ({
        label: institution.name,
        value: institution.id.toString(),
      }));
    },
  });
}
