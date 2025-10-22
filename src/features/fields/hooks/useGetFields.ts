import { useTranslation } from "react-i18next";

import { useGetAllFieldsRaw } from "./useGetAllFieldsRaw";

export const useGetFields = (subCategory?: string) => {
  const { t } = useTranslation();
  const { data: rawFields, isLoading, isError, error } = useGetAllFieldsRaw();

  // Se os dados brutos ainda não estiverem disponíveis, retorna o estado de carregamento/erro
  if (isLoading || isError || !rawFields) {
    return { data: undefined, isLoading, isError, error };
  }

  const experiments: { id: string; name: string; image: string }[] = [];
  const cleanSubcategory = subCategory
    ?.trim()
    .split("-")
    .join(" ")
    .toLocaleLowerCase();

  // Realiza a transformação diretamente
  rawFields
    .filter((field) => field.name.toLowerCase() === cleanSubcategory)
    .forEach((field) => {
      field.experiments?.forEach((experiment) => {
        experiments.push({
          id: experiment.id,
          name: experiment.name,
          image:
            experiment.image ??
            `https://placehold.co/600x400?text=${t("placeholder")}`,
        });
      });
    });

  const sortedExperiments = experiments.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  return { data: sortedExperiments, isLoading, isError, error };
};
