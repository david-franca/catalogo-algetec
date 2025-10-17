import {
  Document,
  DocumentCreate,
  DocumentList,
  DocumentMeta,
  DocumentUpdate,
} from "@/types/documents";
import { Meta } from "@/types/meta";
import { apiClient } from "@/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

export function useDocumentsList() {
  const { limit, page, field, order, experimentId } = useSearch({
    from: "/dashboard/documents/",
  });
  return useQuery<{ data: DocumentList[]; meta: Meta }>({
    queryKey: ["documents", limit, page, field, order, experimentId],
    queryFn: async () => {
      const {
        data: { data, meta },
      } = await apiClient.get<DocumentMeta>(`/templates/all`, {
        params: {
          limit,
          page,
          field,
          order,
          experimentId,
        },
      });
      return {
        data: data.map((document) => ({
          key: document.id,
          id: document.id,
          name: document.name,
          content: document.content,
          createdAt: document.created_at,
          updatedAt: document.updated_at,
        })),
        meta,
      };
    },
    placeholderData: keepPreviousData,
  });
}

export function useDocument(id?: number | string) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Document>(`/templates/show/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useDocumentCreate() {
  return useMutation({
    mutationKey: ["document-create"],
    mutationFn: async (body: DocumentCreate) => {
      const { data } = await apiClient.post("/templates/create", body);
      return data;
    },
  });
}

export function useDocumentUpdate(id?: number | string) {
  return useMutation({
    mutationKey: ["document-update"],
    mutationFn: async (body: DocumentUpdate) => {
      const { data } = await apiClient.put(`/templates/update/${id}`, body);
      return data;
    },
  });
}

export function useDocumentDelete() {
  return useMutation({
    mutationKey: ["document-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/templates/delete/${id}`);
    },
  });
}
