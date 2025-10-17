import { Button, Popconfirm, Space, Tooltip } from "antd";

import { cn } from "@/utils";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-router";

interface ActionsProps {
  id: string;
  resource: string;
  canShow?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  loading?: boolean;
  onDelete?: () => void;
  isNewPage?: boolean;
  IsShowNewPage?: boolean;
}

export function Actions({
  id,
  resource,
  loading,
  onDelete,
  canDelete,
  canEdit,
  canShow,
  isNewPage = false,
  IsShowNewPage = false,
}: ActionsProps) {
  const navigate = useNavigate();
  if (!canShow && !canEdit && !canDelete) {
    return null;
  }

  return (
    <Space>
      <Tooltip title="Visualizar">
        {IsShowNewPage ? (
          <Link
            to={`/dashboard/${resource}/show/$id`}
            params={{ id }}
            className={cn({ hidden: !canShow })}
            target="_blank"
          >
            <Button color="default" variant="outlined" icon={<EyeOutlined />} />
          </Link>
        ) : (
          <Button
            className={cn({ hidden: !canShow })}
            color="default"
            variant="outlined"
            icon={<EyeOutlined />}
            onClick={() => {
              navigate({
                to: `/dashboard/${resource}/show/$id`,
                params: { id },
              });
            }}
          />
        )}
      </Tooltip>
      <Tooltip title="Editar">
        {isNewPage ? (
          <Link
            to={`/dashboard/${resource}/edit/$id`}
            params={{ id }}
            className={cn({ hidden: !canEdit })}
            target="_blank"
          >
            <Button
              color="primary"
              variant="outlined"
              icon={<EditOutlined />}
            />
          </Link>
        ) : (
          <Button
            className={cn({ hidden: !canEdit })}
            color="primary"
            variant="outlined"
            icon={<EditOutlined />}
            onClick={() => {
              navigate({
                to: `/dashboard/${resource}/edit/$id`,
                params: { id },
              });
            }}
          />
        )}
      </Tooltip>

      <Tooltip title="Excluir">
        <Popconfirm
          title={"Você tem certeza?"}
          onConfirm={onDelete}
          okText="Deletar"
          cancelText="Cancelar"
          okButtonProps={{
            color: "danger",
            variant: "outlined",
            loading,
          }}
        >
          <Button
            className={cn({ hidden: !canDelete })}
            color="danger"
            variant="outlined"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
}
