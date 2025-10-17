import { Button, Typography } from "antd";

import { handlePageName } from "@/utils/handlePageName";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

import { Breadcrumb } from "../breadcrumb";

interface Props {
  resource: string;
}
/**
 * Componente de header para a tela de cadastro de um recurso
 *
 * @param {Props} props - Propriedades do componente
 * @param {string} props.resource - Nome do recurso
 *
 * @returns {JSX.Element} - Componente de header
 */
export function CreateHeader({ resource }: Props): JSX.Element {
  const navigate = useNavigate();

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
          Adicionar {handlePageName(resource, true)}
        </Typography.Title>
      </div>
    </>
  );
}
