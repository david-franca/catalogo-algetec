import { List, Popover, TableColumnsType } from "antd";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";

import { FileOutlined, FileTextOutlined } from "@ant-design/icons";

import { TextField } from "../fields";
import { useCan } from "@/hooks";
import { toast } from "sonner";
import { usePracticeDelete } from "@/services/practices.service";
import { Actions } from "../actions";

export function usePracticesColumns() {
  // Permissions
  const can = useCan();
  const canEdit = can("update", "Curriculum");
  const canDelete = can("delete", "Curriculum");
  const canShow = can("view", "Curriculum");
  const canActions = canEdit || canDelete || canShow;

  const { mutateAsync, isPending } = usePracticeDelete();

  const onDelete = useCallback(
    (id: number) => {
      mutateAsync(id)
        .then(() => toast.success("Prática deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar prática"));
    },
    [mutateAsync]
  );

  const columns = useMemo<TableColumnsType>(
    () => [
      {
        title: "Código",
        dataIndex: "code",
        key: "code",
        showSorterTooltip: false,
        width: 150,
        align: "center",
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Prática",
        dataIndex: "name",
        key: "name",
        showSorterTooltip: false,
        width: 150,
        align: "center",
        sorter: true,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Descrição",
        dataIndex: "description",
        key: "description",
        align: "center",
        width: 100,
        render: (value) =>
          value ? (
            <Popover content={value}>
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "ID Lab",
        dataIndex: "experiment_id",
        key: "experiment_id",
        align: "center",
        width: 100,
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Nome Lab",
        dataIndex: "experiment_name",
        key: "experiment_name",
        showSorterTooltip: false,
        align: "center",
        width: 150,
        sorter: true,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Desc Lab",
        dataIndex: "experiment_description",
        key: "experiment_description",
        align: "center",
        width: 100,
        render: (value) =>
          value ? (
            <Popover
              content={
                <div className="w-96 overflow-y-scroll">{parse(value)}</div>
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Área",
        dataIndex: "areas",
        key: "areas",
        showSorterTooltip: false,
        align: "center",
        width: 150,
        render: (values: string[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item}</List.Item>
                  )}
                />
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Habilidades",
        dataIndex: "skills",
        key: "skills",
        showSorterTooltip: false,
        align: "center",
        width: 100,
        render: (values: string[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item}</List.Item>
                  )}
                />
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Ações",
        key: "actions",
        dataIndex: "actions",
        width: 150,
        fixed: "right",
        align: "center",
        hidden: !canActions,
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="issues"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, canShow, isPending, onDelete]
  );

  return { columns, onDelete, canDelete, canEdit, isPending };
}
