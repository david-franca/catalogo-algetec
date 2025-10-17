import { Button, Typography } from "antd";
import { Breadcrumb } from "../breadcrumb";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { ListIcon, RefreshCcwIcon } from "lucide-react";
import { QueryKey } from "@tanstack/react-query";
import { queryClient } from "@/services/client";
import { handlePageName } from "@/utils/handlePageName";
import { useTemplateDownload } from "@/services/templates.service";
import { toast } from "sonner";

interface Props {
  id: string;
  resource: string;
  queryKey?: QueryKey;
  refresh?: () => void;
  search?: Record<string, unknown>;
  urlEdit?: string;
  canDelete?: boolean;
  canExport?: boolean;
}

export function ShowHeader({
  id,
  resource,
  queryKey,
  refresh,
  search,
  urlEdit,
  canDelete,
  canExport,
}: Props) {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useTemplateDownload();

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

  const handleExport = () => {
    mutateAsync(id)
      .then((res) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement("a");
        link.href = url;
        link.download = `zip_${id}_${new Date().getTime()}`;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        toast.error("Erro ao exportar documento");
      });
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
          Visualizar {handlePageName(resource, true)}
        </Typography.Title>
        <div className="flex space-x-2">
          <Button
            icon={<ListIcon className="h-4 w-4" />}
            onClick={() => navigate({ to: `/dashboard/${resource}` })}
          >
            {handlePageName(resource)}
          </Button>
          {canExport && (
            <Button
              icon={<ExportOutlined className="h-4 w-4" />}
              onClick={handleExport}
              loading={isPending}
            >
              Exportar
            </Button>
          )}
          <Button
            color="primary"
            variant="solid"
            icon={<EditOutlined />}
            onClick={() =>
              urlEdit
                ? window.open(urlEdit, "_blank")
                : navigate({
                    to: `/dashboard/${resource}/edit/$id`,
                    params: { id },
                    search: search,
                  })
            }
          >
            Editar
          </Button>
          {canDelete && (
            <Button color="danger" variant="outlined" icon={<DeleteOutlined />}>
              Deletar
            </Button>
          )}
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
