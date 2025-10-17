import { forEach, groupBy, orderBy } from "lodash";

import {
  Release,
  ReleaseCreate,
  ReleaseList,
  ReleaseMeta,
  ReleaseResponse,
  ReleaseType,
  ReleaseUpdate,
} from "@/types/release";
import { apiClient } from "@/utils";
import { completeVersion } from "@/utils/completeVersion";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

import { queryClient } from "./client";

export function useReleaseDelete() {
  return useMutation({
    mutationKey: ["release-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/releases/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
    },
  });
}

export function useReleaseList() {
  const {
    limit,
    page,
    creator,
    experiment,
    field,
    id0,
    id10000,
    id5000,
    languages,
    name,
    order,
    platformA,
    playStore,
  } = useSearch({ from: "/dashboard/releases/" });
  return useQuery<ReleaseList>({
    queryKey: [
      "releases",
      limit,
      page,
      creator,
      experiment,
      field,
      id0,
      id10000,
      id5000,
      languages,
      name,
      order,
      platformA,
      playStore,
    ],
    queryFn: async () => {
      const {
        data: { data, meta },
      } = await apiClient.get<ReleaseMeta>("/releases/all", {
        params: {
          limit,
          page,
          creator,
          experiment,
          field,
          id0,
          id10000,
          id5000,
          languages,
          name,
          order,
          platformA,
          playStore,
        },
      });
      const res: ReleaseResponse[] = [];

      data.forEach((release) => {
        if (release.releaseType.length === 1) {
          res.push({ ...release, releaseType: release.releaseType[0] });
        }
        if (release.releaseType.length > 1) {
          release.releaseType.forEach((releaseType) =>
            res.push({ ...release, releaseType })
          );
        }
      });

      const newReleases: Release[] = [];

      forEach(groupBy(res, "id"), (data) => {
        const releaseType: ReleaseType[] = [];
        data.forEach((el) => releaseType.push(el.releaseType));
        newReleases.push({ ...data[0], releaseType });
      });

      return {
        data: orderBy(
          newReleases.map((i) => ({
            key: i.id,
            id: i.id,
            experiment_id: i.experiment_id,
            name: i.experiment.name,
            type: i.releaseType,
            version: completeVersion(i.version),
            created_at: i.created_at,
            author: i.author.name,
            id_0: i.id_0,
            id_5000: i.id_5000,
            id_6000: i.id_6000,
            play_store: i.play_store,
            languages: i.languages,
            platform_a: i.platform_a,
            description: i.description,
          })),
          "created_at",
          "desc"
        ),
        meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useReleaseCreate() {
  return useMutation({
    mutationKey: ["release-create"],
    mutationFn: async (data: ReleaseCreate) => {
      await apiClient.post("/releases/create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
    },
  });
}

export function useReleaseShow(id: number | string) {
  return useQuery<Release>({
    queryKey: ["release", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Release[]>(`/releases/show/${id}`);
      return data[0];
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useReleaseUpdate(id: number | string) {
  return useMutation({
    mutationKey: ["release-update"],
    mutationFn: async (data: ReleaseUpdate) => {
      await apiClient.put(`/releases/update/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
    },
  });
}
