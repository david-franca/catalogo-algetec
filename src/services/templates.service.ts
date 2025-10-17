import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useTemplateUpload() {
  return useMutation({
    mutationKey: ["template-upload"],
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const { data: response } = await apiClient.post<{ templateId: number }>(
        `/templates/upload-zip/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    },
  });
}

export function useTemplateDownload() {
  return useMutation({
    mutationKey: ["template-download"],
    mutationFn: async (id: number | string) => {
      const { data } = await apiClient.get(`/templates/download-zip/${id}`, {
        responseType: "blob",
      });
      return data;
    },
  });
}
