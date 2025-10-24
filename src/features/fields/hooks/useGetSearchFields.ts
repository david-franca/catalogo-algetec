import { useGetAllFieldsRaw } from "./useGetAllFieldsRaw";

export interface FieldItem {
  id: string;
  name: string;
  image?: string | null;
  // Adicione category e slug se precisar deles para o link
  categorySlug?: string;
  subcategorySlug?: string;
}

export const useGetSearchFields = () => {
  const { data: rawFields, isLoading, isError, error } = useGetAllFieldsRaw();

  // Se os dados brutos ainda não estiverem disponíveis, retorna o estado de carregamento/erro
  if (isLoading || isError || !rawFields) {
    return { data: undefined, isLoading, isError, error };
  }

  const items: FieldItem[] = [];
  rawFields.forEach((item) => {
    item.experiments?.forEach((exp) => {
      items.push({
        id: exp.id,
        name: exp.name,
        image: exp.image,
        subcategorySlug: item.name.toLowerCase().replace(/\s+/g, "-"),
        categorySlug: item.category.toLowerCase().replace(/\s+/g, "-"),
      });
    });
  });

  return { data: items, isLoading, isError, error };
};
