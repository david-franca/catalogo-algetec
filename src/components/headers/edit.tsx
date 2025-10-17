import { Breadcrumb } from "../breadcrumb";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { ListIcon, RefreshCcwIcon } from "lucide-react";
import { queryClient } from "@/services/client";
import { QueryKey } from "@tanstack/react-query";
import { handlePageName } from "@/utils/handlePageName";

interface Props {
  id: string | number;
  resource: string;
  queryKey?: QueryKey;
  refresh?: () => void;
}
/**
 * Componente de header para a página de edição.
 *
 * @param {Object} props
 * @prop {string|number} id - ID do recurso
 * @prop {string} resource - Nome do recurso
 * @prop {QueryKey} queryKey - Chave da query
 * @prop {Function} refresh - Função para atualizar a tela
 * @returns {JSX.Element}
 */
export function EditHeader({
  id,
  resource,
  queryKey,
  refresh,
}: Props): JSX.Element {
  const navigate = useNavigate();

  /**
   * Refetches data for the component.
   *
   * If a `refresh` function is provided, it will be called.
   * Otherwise, it will refetch queries using the `queryClient` with
   * the specified `queryKey`, or a default key consisting of `resource` and `id`.
   * Ensures that only active queries matching the exact key are refetched.
   */

  const refetch = () => {
    if (refresh) {
      refresh();
    } else {
      queryClient.refetchQueries({
        queryKey: queryKey || [resource, id],
        exact: true,
        type: "active",
      });
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <Typography.Title level={4}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate({ to: `/dashboard/${resource}` })}
          />{" "}
          Editar {handlePageName(resource, true)}
        </Typography.Title>
        <div className="flex space-x-2">
          <Button
            icon={<ListIcon className="h-4 w-4" />}
            onClick={() => navigate({ to: `/dashboard/${resource}` })}
          >
            {handlePageName(resource)}
          </Button>
          <Button
            icon={<RefreshCcwIcon className="h-4 w-4" />}
            onClick={refetch}
          >
            Atualizar
          </Button>
        </div>
      </div>
    </>
  );
}
