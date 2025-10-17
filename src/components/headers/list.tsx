import { Button, Space, Typography } from "antd";
import { PlusIcon } from "lucide-react";

import { Pages } from "@/types/pages";
import { handlePageName } from "@/utils/handlePageName";
import { QueryKey } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

import { Breadcrumb } from "../breadcrumb";
import { Filters } from "../filters";

interface ListHeaderProps {
  resource: Pages;
  showNew?: boolean;
  queryKey?: QueryKey;
  extraActions?: React.ReactNode;
  openInNewTab?: boolean;
}

/**
 * Componente de header para a lista de recursos.
 *
 * @param {ListHeaderProps} props
 * @prop {Pages} resource - Nome do recurso
 * @prop {boolean} showNew - Mostrar o botão de criar um novo recurso
 * @prop {React.ReactNode} extraActions - Nós React para renderizar ações adicionais
 * @prop {boolean} openInNewTab - Ao invés de navegar para a tela de criação, abre em uma nova aba
 *
 * @returns {JSX.Element}
 */
export function ListHeader({
  resource,
  showNew = true,
  openInNewTab = false,
  extraActions,
}: ListHeaderProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <Typography.Title level={4}>
          {handlePageName(resource)}
        </Typography.Title>
        <Space>
          {extraActions}
          {showNew &&
            (openInNewTab ? (
              <Link to={`/dashboard/${resource}/create`} target="_blank">
                <Button type="primary" icon={<PlusIcon className="h-4 w-4" />}>
                  Novo
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                icon={<PlusIcon className="h-4 w-4" />}
                onClick={() =>
                  navigate({
                    to: `/dashboard/${resource}/create`,
                  })
                }
              >
                Novo
              </Button>
            ))}
        </Space>
      </div>
      <Filters resource={resource} />
    </>
  );
}
