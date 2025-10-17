import { capitalizeSentence } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getFields } from "../api/getAll";
import { icons } from "./sidebarIcons";

export const useGetSidebarFields = () => {
  const { i18n } = useTranslation();

  return useQuery({
    // Adicionar o idioma à queryKey garante que os dados sejam reprocessados na troca de idioma
    queryKey: ["sidebar-fields", i18n.language],
    queryFn: () => getFields(),
    select: (data) => {
      // Função auxiliar para criar slugs para a URL a partir de um texto.
      const createUrlSlug = (text: string) =>
        text.toLowerCase().replace(/\s+/g, "-");

      // 1. Filtra os dados pelo idioma atual uma única vez.
      const itemsForCurrentLang = data.filter((item) =>
        i18n.language.toLowerCase().includes(item.language.toLowerCase())
      );

      // 2. Agrupa os itens por categoria, mantendo o nome de exibição e o slug.
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
            color: icons.find((icon) => icon.title === category)?.color,
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
      return mainFields;
    },
    placeholderData: keepPreviousData,
  });
};
