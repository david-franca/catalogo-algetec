import { apiClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
  return useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async (body: FormData) => {
      const { data } = await apiClient.post<{ links: string[] }>(
        "/images/create",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
  });
}
