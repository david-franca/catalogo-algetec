import Table, { ColumnsType } from "antd/es/table";
import { Button, Modal, Space, Tooltip, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { useCallback } from "react";
import { ExperimentDocument } from "@/types/experiment";
import { useCan } from "@/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useDocumentDelete } from "@/services/documents.service";
import { TextField } from "@/components/fields";

interface DocumentTableProps {
  dataSource: ExperimentDocument[];
  loading: boolean;
}
export function DocumentTable({ dataSource, loading }: DocumentTableProps) {
  const navigate = useNavigate();
  const { confirm } = Modal;
  const [toast, contextHolder] = message.useMessage();
  const { mutateAsync, isPending: isDeletingTemplate } = useDocumentDelete();

  // Permissions
  const can = useCan();
  const canView = can("view", "Template");
  const canEdit = can("update", "Template");
  const canDelete = can("delete", "Template");
  const canActions = canView || canEdit || canDelete;

  const showDeleteConfirm = useCallback(
    (value: ExperimentDocument) => {
      confirm({
        title: `Deletar o documento ${value.name}?`,
        icon: <ExclamationCircleFilled />,
        content: "Essa ação não pode ser desfeita!",
        okText: "Sim",
        okType: "danger",
        cancelText: "Não",
        onOk: () => {
          mutateAsync(value.id)
            .then(() =>
              toast.success(
                `O documento ${value.name} foi deletado com sucesso.`
              )
            )
            .catch((error) =>
              error && "data" in error
                ? toast.error("Erro ao deletar documento")
                : null
            );
        },
        okButtonProps: {
          loading: isDeletingTemplate,
        },
        maskStyle: {
          backdropFilter: "blur(8px)",
        },
      });
    },
    [confirm, isDeletingTemplate, mutateAsync, toast]
  );

  const columns: ColumnsType<ExperimentDocument> = [
    {
      title: "Nome do documento",
      dataIndex: "name",
      key: "name",
      width: 170,
      render: (value) => <TextField value={value} />,
    },
    canActions
      ? {
          title: "Ações",
          key: "actions",
          dataIndex: "actions",
          align: "center",
          render: (_, record) => (
            <Space>
              {canView && (
                <Button
                  icon={<EyeOutlined />}
                  onClick={() =>
                    navigate({
                      to: `/dashboard/documents/show/$id`,
                      params: {
                        id: record.id.toString(),
                      },
                    })
                  }
                />
              )}
              {canEdit && (
                <Tooltip title="Editar">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      navigate({
                        to: `/dashboard/documents/edit/$id`,
                        params: {
                          id: record.id.toString(),
                        },
                      });
                    }}
                  />
                </Tooltip>
              )}
              {canDelete && (
                <Tooltip title="Excluir">
                  <Button
                    danger
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      showDeleteConfirm(record);
                      // refechMethod()
                    }}
                  />
                </Tooltip>
              )}
            </Space>
          ),
        }
      : {},
  ];

  return (
    <>
      {contextHolder}
      <Table
        loading={isDeletingTemplate || loading}
        className="w-full"
        size="small"
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1000, y: "72vh" }}
        pagination={{
          position: ["bottomCenter"],
          defaultPageSize: 100,
          pageSizeOptions: [100, 200, 500],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} problemas`,
        }}
      />
    </>
  );
}
