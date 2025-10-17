import { Checklist, ChecklistCreate, ChecklistUpdate } from "@/types/checklist";
import { apiClient, handleTypeName } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "./client";

export function useChecklistList() {
  return useQuery({
    queryKey: ["checklists"],
    queryFn: async () => {
      const { data } = await apiClient.get<Checklist[]>("/checklists/all");
      return data.map((checklist) => ({
        key: checklist.id,
        id: checklist.id,
        name: checklist.name,
        departments: checklist.departments.map((department) =>
          handleTypeName(department.name)
        ),
      }));
    },
  });
}

export function useChecklist() {
  return useQuery({
    queryKey: ["checklists"],
    queryFn: async () => {
      const { data } = await apiClient.get<Checklist[]>("/checklists/all");
      return data;
    },
  });
}

export function useChecklistDelete() {
  return useMutation({
    mutationKey: ["checklist-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/checklists/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
    },
  });
}

export function useChecklistCreate() {
  return useMutation({
    mutationKey: ["checklist-create"],
    mutationFn: async (body: ChecklistCreate) => {
      const { data } = await apiClient.post<Checklist>(
        "/checklists/create",
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
    },
  });
}

export function useChecklistUpdate(id: number | string) {
  return useMutation({
    mutationKey: ["checklist-update"],
    mutationFn: async (body: ChecklistUpdate) => {
      const { data } = await apiClient.put<Checklist>(
        `/checklists/update/${id}`,
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
    },
  });
}

export function useChecklistShow(id: number | string) {
  return useQuery({
    queryKey: ["checklist-show", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Checklist[]>(`/checklists/all`);

      const checklist = data.find((checklist) => checklist.id === Number(id));
      return checklist;
    },
  });
}
