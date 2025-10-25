import { useTranslation } from "react-i18next";

import { useGetAllFieldsRaw } from "./useGetAllFieldsRaw";

export interface FieldItem {
  id: string;
  name: string;
  image?: string | null;
  categorySlug: string;
  subcategorySlug: string;
  featured?: boolean;
  beta?: boolean;
  language: string;
}

export const useGetSearchFields = ({ isNews }: { isNews?: boolean } = {}) => {
  const { data: rawFields, isLoading, isError, error } = useGetAllFieldsRaw();
  const { i18n } = useTranslation();

  if (isLoading || isError || !rawFields) {
    return { data: undefined, isLoading, isError, error };
  }

  const items: FieldItem[] = [];
  rawFields
    .filter((item) =>
      i18n.language.toLowerCase().includes(item.language.toLowerCase())
    )
    .forEach((item) => {
      item.experiments?.forEach((exp) => {
        items.push({
          id: exp.id,
          name: exp.name,
          image: exp.image,
          subcategorySlug: item.name.toLowerCase().replace(/\s+/g, "-"),
          categorySlug: item.category.toLowerCase().replace(/\s+/g, "-"),
          featured: exp.status === 0,
          beta: exp.status === 1,
          language: item.language,
        });
      });
    });

  if (isNews) {
    return {
      data: items
        .filter((item) => item.featured ?? item.beta)
        .filter((item) =>
          i18n.language.toLowerCase().includes(item.language.toLowerCase())
        )
        .sort((a, b) => Number(a.id) - Number(b.id)),
      isLoading,
      isError,
      error,
    };
  }

  return { data: items, isLoading, isError, error };
};
