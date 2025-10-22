import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getFields } from "../api/getAll";
import type { Category } from "../schemas";

/**
 * Um hook personalizado para buscar todos os dados brutos dos campos.
 * Este hook centraliza a busca de dados para os campos, permitindo que outros hooks
 * consumam e transformem esses dados sem fazer chamadas redundantes à API.
 *
 * A queryKey inclui o idioma atual para garantir que, se o backend
 * implicitamente retornar dados específicos do idioma, ou se as transformações
 * do lado do cliente forem altamente dependentes do idioma e exigirem um novo
 * contexto de dados, o cache da query seja invalidado e os dados reavaliados/refetched.
 */
export const useGetAllFieldsRaw = () => {
  const { i18n } = useTranslation();

  return useQuery<Category[], Error>({
    queryKey: ["all-fields-raw", i18n.language],
    queryFn: getFields,
    placeholderData: keepPreviousData,
  });
};
