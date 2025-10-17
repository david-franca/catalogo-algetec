import { SelectOptions } from "@/types/select";
import {
  WikiCategories,
  WikiCategoryResponse,
  WikiCreate,
  WikiCreateCategory,
  WikiPages,
  WikiUpdate,
} from "@/types/wiki";
import { apiClient } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "./client";

export function useWikiList() {
  return useQuery({
    queryKey: ["wiki-list"],
    queryFn: async () => {
      const { data } = await apiClient.get<WikiCategories[]>(
        "/documentationCategories/all"
      );
      return data;
    },
  });
}

export const useWikiSelect = () => {
  return useQuery<SelectOptions[]>({
    queryKey: ["wiki-select"],
    queryFn: async () => {
      const { data } = await apiClient.get<WikiCategories[]>(
        "/documentationCategories/all"
      );
      return data
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => ({
          label: category.name.toUpperCase(),
          value: category.id.toString(),
        }));
    },
  });
};

export function useWikiCreate() {
  return useMutation({
    mutationKey: ["wiki-create"],
    mutationFn: async (body: WikiCreate) => {
      const { data } = await apiClient.post<{ links: string[] }>(
        "/documentationPages/create",
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wiki-list"] });
    },
  });
}

export function useWikiCategoryCreate() {
  return useMutation({
    mutationKey: ["wiki-category-create"],
    mutationFn: async (body: WikiCreateCategory) => {
      const { data } = await apiClient.post<WikiCategoryResponse>(
        "/documentationCategories/create",
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wiki-select"] });
    },
  });
}

export function useWikiShow(id?: number | string, contentId?: number) {
  return useQuery<WikiPages[]>({
    queryKey: ["wiki-show", id, contentId],
    queryFn: async () => {
      const { data } = await apiClient.get<WikiPages[]>(
        `/documentationPages/show/${id}`,
        {
          params: {
            contentId,
          },
        }
      );
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useWikiDelete(id: number | string) {
  return useMutation({
    mutationKey: ["wiki-delete"],
    mutationFn: async () => {
      await apiClient.delete(`/documentationPages/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wiki-list"] });
    },
  });
}

export function useWikiUpdate(id?: number | string) {
  return useMutation({
    mutationKey: ["wiki-update"],
    mutationFn: async (body: WikiUpdate) => {
      await apiClient.put(`/documentationPages/update/${id}`, body.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wiki-show", id],
      });
    },
  });
}

export function useWikiToggleArchive() {
  return useMutation({
    mutationKey: ["wiki-archive"],
    mutationFn: async ({
      id,
      archived,
    }: {
      id: number | string;
      archived: boolean;
    }) => {
      await apiClient.put(`/documentationPages/update/${id}`, {
        archived,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wiki-list"] });
    },
  });
}
