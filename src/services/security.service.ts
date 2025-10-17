import { apiClient } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";

export interface Actions {
  id: number;
  name: string;
  description: string;
}

export interface Permissions {
  [x: string]: Actions[];
}

export interface RouteGroup {
  id: number;
  entity: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface GroupPermissions {
  id: number;
  allowed: boolean;
  route_group_id: number;
  routeGroup: RouteGroup;
}

export interface CreateRouteGroupConnections {
  user_id?: number;
  role_id?: number;
  department_id?: number;
  allowedRouteGroups?: number[];
  forbiddenRouteGroups?: number[];
}

export function useGetRolePermissions(id?: number | string) {
  return useQuery({
    queryKey: ["role-permissions", id],
    queryFn: async () => {
      const { data } = await apiClient.get<GroupPermissions[]>(
        `/routeGroupConnections/getRolePermissions/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
}

export function useGetDepartmentPermissions(id?: number | string) {
  return useQuery({
    queryKey: ["department-permissions", id],
    queryFn: async () => {
      const { data } = await apiClient.get<GroupPermissions[]>(
        `/routeGroupConnections/getDepartmentPermissions/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
}

export function useGetUserPermissions(id?: number | string) {
  return useQuery({
    queryKey: ["user-permissions", id],
    queryFn: async () => {
      const { data } = await apiClient.get<GroupPermissions[]>(
        `/routeGroupConnections/getUserPermissions/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
}

export function useGetAllPermissions() {
  return useQuery({
    queryKey: ["all-permissions"],
    queryFn: async () => {
      const { data } = await apiClient.get<Permissions>(`/routeGroups/all`);
      const keyName = Object.keys(data);
      return keyName.map((key) => {
        const actions = data[key];
        return {
          title: key,
          actions,
        };
      });
    },
  });
}

export function useCreateRouteGroupConnections() {
  return useMutation({
    mutationKey: ["create-route-group-connections"],
    mutationFn: async (data: CreateRouteGroupConnections) => {
      await apiClient.post("/routeGroupConnections/create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-permissions"] });
      queryClient.invalidateQueries({ queryKey: ["department-permissions"] });
      queryClient.invalidateQueries({ queryKey: ["user-permissions"] });
    },
  });
}
