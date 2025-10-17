import { Key } from "react";

import { SelectOptions } from "@/types/select";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { User, UserCreate, UserSingle, UserUpdate } from "../types/user";
import { apiClient } from "../utils/HttpClient";
import { queryClient } from "./client";

export interface UserList {
  key: Key;
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
  role_id: number;
  department: string;
  department_id: number;
}

export function useUserList() {
  return useQuery<UserList[]>({
    queryKey: ["users"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>("/users");

      return data.map((user) => ({
        key: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        role: user.role.name,
        role_id: user.role.id,
        department: user.department.name,
        department_id: user.department.id,
      }));
    },
  });
}

export function useUser(id?: number | string) {
  return useQuery<UserSingle>({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await apiClient.get<UserSingle>(`/users/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useUserCreate() {
  return useMutation({
    mutationKey: ["user-create"],
    mutationFn: async (body: UserCreate) => {
      const { data } = await apiClient.post<User>("/users/create", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUserEdit() {
  return useMutation({
    mutationKey: ["user-edit"],
    mutationFn: async (body: UserUpdate) => {
      const { data } = await apiClient.put<User>(`/users/${body.id}`, body);
      return data;
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
}

export function useUserDelete(id: number) {
  return useMutation({
    mutationKey: ["user-delete"],
    mutationFn: async () => {
      const { data } = await apiClient.delete<User>(`/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
}

export function useUserSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["user-select"],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>("/users");
      return data.map((user) => ({
        label: user.name,
        value: user.id.toString(),
      }));
    },
  });
}
