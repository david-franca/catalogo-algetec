import { useTranslation } from "react-i18next";

import { capitalizeSentence } from "@/lib/utils";

import { icons } from "./sidebarIcons";
import { useGetAllFieldsRaw } from "./useGetAllFieldsRaw";

export const useGetSidebarFields = () => {
  const {
    data: rawFields,
    isLoading,
    isPending,
    isError,
    error,
  } = useGetAllFieldsRaw();
  const { i18n } = useTranslation();

  // Se os dados brutos ainda não estiverem disponíveis, retorna o estado de carregamento/erro
  if (isLoading || isPending || isError || !rawFields) {
    return { data: undefined, isLoading, isError, error };
  }

  // 1. Filtra os dados pelo idioma atual uma única vez.
  const itemsForCurrentLang = rawFields
    .filter((item) =>
      i18n.language.toLowerCase().includes(item.language.toLowerCase())
    )
    .filter((item) => item.experiments?.length);

  // Função auxiliar para criar slugs para a URL a partir de um texto.
  const createUrlSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

  const categoriesMap = new Map<string, { name: string; slug: string }[]>();
  for (const item of itemsForCurrentLang) {
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, []);
    }
    categoriesMap
      .get(item.category)
      ?.push({ name: item.name, slug: createUrlSlug(item.name) });
  }

  // 3. Transforma o mapa na estrutura final da UI.
  const mainFields = Array.from(categoriesMap.entries()).map(
    ([category, items]) => {
      return {
        title: capitalizeSentence(category), // Ex: "Ciências da Natureza"
        color: icons.find(
          (icon) => icon.title.toLowerCase() === category.toLowerCase()
        )?.color,
        icon: icons.find(
          (icon) => icon.title.toLowerCase() === category.toLowerCase()
        )?.icon,
        items: items.map((item) => ({
          title: capitalizeSentence(item.name), // Ex: "Física Geral"
          slug: item.slug, // Ex: "fisica-geral"
          category: createUrlSlug(category), // Ex: "ciencias-da-natureza"
        })),
      };
    }
  );
  return { data: mainFields, isLoading, isError, error, isPending };
};
