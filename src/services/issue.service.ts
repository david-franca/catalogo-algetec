import {
  Issue,
  IssueCommentsCreate,
  IssueList,
  IssueMeta,
} from "@/types/issue";
import { Meta } from "@/types/meta";
import { apiClient } from "@/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

import { queryClient } from "./client";

export function useIssueDelete() {
  return useMutation({
    mutationKey: ["issue-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/issues/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useIssueList() {
  const {
    limit,
    page,
    field,
    experiment,
    order,
    approved,
    creator,
    priority,
    responsible,
    problem,
    status,
  } = useSearch({
    from: "/dashboard/issues/",
  });
  return useQuery<{ data: IssueList[]; meta: Meta }>({
    queryKey: [
      "issues",
      limit,
      page,
      field,
      experiment,
      order,
      approved,
      creator,
      priority,
      responsible,
      problem,
      status,
    ],
    queryFn: async () => {
      const {
        data: { data, meta },
      } = await apiClient.get<IssueMeta>("/issues/all", {
        params: {
          limit,
          page,
          field,
          experiment,
          order,
          approved,
          creator,
          priority,
          responsible,
          problem,
          status,
        },
      });
      return {
        data: data.map((issue) => ({
          approved: issue.approved,
          created_at: issue.created_at,
          created_by_id: issue.created_by_id,
          creator: issue.creator.name,
          description: issue.description,
          experiment_id: issue.experiment_id,
          id: issue.id,
          issueTags: issue.issueTags.map((tag) => tag.name),
          priority: issue.priority,
          key: issue.id,
          problem: issue.problem,
          responsible_id: issue.responsible_id,
          responsible: issue.responsible.name,
          status: issue.status,
          updated_at: issue.updated_at,
          version: issue.version,
        })),
        meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useIssueShow(id?: number | string) {
  return useQuery<Issue>({
    queryKey: ["issues", id],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Issue>(`/issues/show/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useIssueUpdate(id?: number | string) {
  return useMutation({
    mutationKey: ["issue-update"],
    mutationFn: async (body: FormData) => {
      const { data } = await apiClient.put(`/issues/update/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useIssueCommentCreate(id: number | string) {
  return useMutation({
    mutationKey: ["issue-comment-create"],
    mutationFn: async (body: IssueCommentsCreate) => {
      const { data } = await apiClient.post(`/issueComments/create`, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues", id] });
    },
  });
}

export function useIssueCreate() {
  return useMutation({
    mutationKey: ["issue-create"],
    mutationFn: async (body: FormData) => {
      const { data } = await apiClient.post<Issue>("/issues/massCreate", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}
