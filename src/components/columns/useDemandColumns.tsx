import { Space, TableColumnsType, Tooltip, Typography } from "antd";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useAuth, useCan } from "@/hooks";
import { DemandList, useDemandDelete } from "@/services/demand.service";
import { CrudStatus } from "@/types/permissions";
import { getUniqueColor } from "@/utils";
import { Link, useSearch } from "@tanstack/react-router";

import {
  DateField,
  TagField,
  TextField,
  UrlField,
} from "../../components/fields";
import { Actions } from "../actions";

export function useDemandColumns(): TableColumnsType<DemandList> {
  const search = useSearch({ from: "/dashboard/demands/" });

  const { mutateAsync, isPending } = useDemandDelete();

  const onDelete = useCallback(
    (id: number) => {
      mutateAsync(id)
        .then(() => toast.success("Demanda deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar demanda"));
    },
    [mutateAsync]
  );

  const { permissions } = useAuth();

  const updateView = useMemo<CrudStatus>(() => {
    let view: CrudStatus = "update";
    if (permissions) {
      const permissionFounded = permissions.Demand.find((p) =>
        p.includes("update")
      );
      if (permissionFounded) {
        view = permissionFounded;
      }
    }
    return view;
  }, [permissions]);

  const can = useCan();
  const canEdit = can(updateView, "Demand");
  const canDelete = can("delete", "Demand");
  const canShow = can("view", "Demand");
  const canActions = canEdit || canDelete || canShow;

  const columns = useMemo<TableColumnsType<DemandList>>(
    () => [
      {
        title: "ID Lab",
        dataIndex: "experiment_id",
        key: "experiment_id",
        width: 100,
        hidden: search.hide?.includes("experiment_id"),
        sorter: true,
        render: (value: number) => (
          <UrlField
            value={value.toString()}
            href={`/dashboard/labs/show/${value}`}
            target="_blank"
          />
        ),
      },
      {
        title: "Laboratório",
        dataIndex: "experiment",
        key: "experiment",
        showSorterTooltip: false,
        ellipsis: { showTitle: false },
        width: 150,
        sorter: true,
        render: (value, record) => (
          <Tooltip title={value} placement="topLeft">
            <Link to={`/dashboard/demands/show/${record.id}`}>
              <Typography.Link>{value}</Typography.Link>
            </Link>
          </Tooltip>
        ),
      },
      {
        title: "Instituição",
        dataIndex: "client",
        key: "client",
        ellipsis: true,
        width: 150,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: 200,
        render: (tags: string[]) => (
          <Space
            size="middle"
            wrap
            style={{ wordWrap: "break-word", wordBreak: "break-word" }}
          >
            {tags.map((tag, index) => (
              <TagField
                value={tag}
                color={getUniqueColor(`${tag}-$`)}
                key={`${tag}-${index}`}
              />
            ))}
          </Space>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: (value) => (
          <TagField value={value} color={getUniqueColor(value)} key={value} />
        ),
      },
      {
        title: "Autor",
        key: "author",
        dataIndex: "author",
        width: 130,
        render: (value) => <TextField value={value} ellipsis />,
        sorter: {
          compare: (a, b) => a.author.localeCompare(b.author),
        },
      },
      {
        title: "Prazo",
        key: "finished_at",
        dataIndex: "finished_at",
        width: 110,
        render: (value) => <DateField value={value} />,
      },
      {
        title: "Roteirização",
        dataIndex: "scripting",
        key: "scripting",
        width: 140,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "Modelagem",
        dataIndex: "modeling",
        key: "modeling",
        width: 140,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "Programação",
        dataIndex: "coding",
        key: "coding",
        width: 160,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "Testes",
        dataIndex: "testing",
        key: "testing",
        width: 140,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "UALAB",
        dataIndex: "ualab",
        key: "ualab",
        width: 140,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "Design",
        dataIndex: "designing",
        key: "designing",
        width: 140,
        render: (value: string) => <TextField value={value} ellipsis />,
      },
      {
        title: "Ações",
        key: "actions",
        dataIndex: "actions",
        width: 130,
        fixed: "right",
        align: "center",
        filteredValue: null,
        filterSearch: false,
        hidden: !canActions || search.hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="demands"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, canShow, isPending, onDelete, search.hide]
  );

  return columns;
}
