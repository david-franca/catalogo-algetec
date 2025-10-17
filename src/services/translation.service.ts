import { toast } from "sonner";

import { CreateUnity } from "@/types/translations";
import { apiClient } from "@/utils";
import { generateUniqueToken } from "@/utils/generateUnityToken";
import { useMutation } from "@tanstack/react-query";

export const useTranslationCSV = () => {
  return useMutation({
    mutationKey: ["translation-csv"],
    mutationFn: async ({ id, language }: { id: string; language: string }) => {
      const filename = language !== "all" ? `${id}_${language}` : id;
      const csv = language !== "all" ? `${id}_${language}` : `${id}`;
      const { data } = await apiClient.get(`/locales/showUnity/${csv}.csv`, {
        headers: {
          "unity-token": generateUniqueToken(id.toString()),
        },
        responseType: "blob",
      });

      return { data, filename };
    },
    onSuccess: async ({ data, filename }) => {
      const url = window.URL.createObjectURL(data);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export function useCreateUnity() {
  return useMutation({
    mutationKey: ["create-unity"],
    mutationFn: async ({
      experiment_id,
      language,
      version,
      file,
    }: CreateUnity) => {
      const formData = new FormData();
      const lang = language === "all" ? null : language;
      formData.append(
        "data",
        JSON.stringify({ experiment_id, language: lang, version })
      );
      if (file) {
        formData.append("content", file);
      }

      const { data } = await apiClient.post(`/locales/createUnity`, formData, {
        headers: {
          "unity-token": generateUniqueToken(experiment_id),
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Arquivo enviado com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
