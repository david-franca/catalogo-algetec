import {
  Button,
  List,
  Modal,
  Popover,
  Space,
  TableColumnsType,
  Tooltip,
} from "antd";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import { Practice } from "@/types/practice";
import { ObjectCompetence } from "@/types/skills";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  FileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { TextField } from "../fields";
import { useSkillDelete } from "@/services/skills.service";

const { confirm } = Modal;

export function useSkillsColumns() {
  // Permissions
  const can = useCan();
  const canDelete = can("delete", "Curriculum");
  const canUpdate = can("update", "Curriculum");
  const canView = can("view", "Curriculum");
  const canActions = canDelete || canUpdate || canView;

  const { mutateAsync: deleteSkill, isPending: isDeletingSkill } =
    useSkillDelete();

  const navigate = useNavigate();
  const { hide } = useSearch({ from: "/dashboard/curriculums/skills/" });

  const showDeleteConfirm = useCallback(
    (id: number): void => {
      confirm({
        title: `Deletar a habilidade?`,
        icon: <ExclamationCircleFilled />,
        content: "Essa ação não pode ser desfeita!",
        okText: "Sim",
        okType: "danger",
        cancelText: "Não",
        onOk: () => {
          deleteSkill(id)
            .then(() => toast.success(`A habilidade foi deletado com sucesso.`))
            .catch(() => toast.error("Erro ao deletar habilidade"));
        },
        okButtonProps: {
          loading: isDeletingSkill,
        },
        maskStyle: {
          backdropFilter: "blur(8px)",
        },
      });
    },
    [deleteSkill, isDeletingSkill]
  );

  const columns = useMemo<TableColumnsType>(
    () => [
      {
        title: "Currículo",
        dataIndex: "competenceCurriculumName",
        key: "competenceCurriculumName",
        showSorterTooltip: false,
        align: "center",
        hidden: hide?.includes("competenceCurriculumName"),
        width: 150,
        sorter: true,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Área da Competência",
        dataIndex: "competenceAreaName",
        key: "competenceAreaName",
        hidden: hide?.includes("competenceAreaName"),
        showSorterTooltip: false,
        align: "center",
        width: 150,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Cód Competência",
        dataIndex: "competenceCode",
        key: "competenceCode",
        hidden: hide?.includes("competenceCode"),
        showSorterTooltip: false,
        align: "center",
        width: 180,
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Desc Competência",
        dataIndex: "competenceDescription",
        key: "competenceDescription",
        hidden: hide?.includes("competenceDescription"),
        align: "center",
        width: 150,
        render: (value) =>
          value ? (
            <Popover
              content={<div className="w-92 h-full max-h-96">{value}</div>}
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Cód Hab",
        dataIndex: "code",
        key: "code",
        hidden: hide?.includes("code"),
        showSorterTooltip: false,
        width: 120,
        align: "center",
        sorter: {
          compare: (a, b) => a.code.localeCompare(b.code),
        },
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Desc Hab",
        dataIndex: "description",
        key: "description",
        hidden: hide?.includes("description"),
        align: "center",
        width: 110,
        render: (value) =>
          value ? (
            <Popover
              content={<div className="w-92 h-full max-h-96">{value}</div>}
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Obj Conhecimento",
        dataIndex: "objects",
        key: "objects",
        hidden: hide?.includes("objects"),
        showSorterTooltip: false,
        align: "center",
        width: 150,
        render: (values: ObjectCompetence[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item.name}</List.Item>
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
        title: "Unidade Temática",
        dataIndex: "unites",
        key: "unites",
        hidden: hide?.includes("unites"),
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
        title: "Notas",
        dataIndex: "notes",
        key: "notes",
        hidden: hide?.includes("notes"),
        align: "center",
        width: 80,
        render: (value) =>
          value ? (
            <Popover
              content={<div className="w-92 h-full max-h-96">{value}</div>}
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Práticas",
        dataIndex: "practices",
        key: "practices",
        hidden: hide?.includes("practices"),
        showSorterTooltip: false,
        align: "center",
        width: 100,
        render: (values: Practice[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item
                      key={nanoid()}
                    >{`${item.code} | ID: ${item.experiment_id} | ${item.name}`}</List.Item>
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
          <Space>
            {canView && (
              <Button
                icon={<EyeOutlined />}
                onClick={() =>
                  navigate({
                    to: "/dashboard/curriculums/skills/show/$id",
                    params: { id: record.id.toString() },
                  })
                }
              />
            )}
            {canUpdate && (
              <Tooltip title="Editar">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    navigate({
                      to: "/dashboard/curriculums/skills/edit/$id",
                      params: { id: record.id.toString() },
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
                    showDeleteConfirm(record.id);
                  }}
                />
              </Tooltip>
            )}
          </Space>
        ),
      },
    ],
    [
      canActions,
      canDelete,
      canUpdate,
      canView,
      hide,
      navigate,
      showDeleteConfirm,
    ]
  );

  return { columns, showDeleteConfirm };
}
