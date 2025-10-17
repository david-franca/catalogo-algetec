import { TableColumnsType } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import { useIssueDelete } from "@/services/issue.service";
import { IssueList } from "@/types/issue";
import { getUniqueColor } from "@/utils";
import { completeVersion } from "@/utils/completeVersion";
import { handlePriority } from "@/utils/handlePriority";
import { useSearch } from "@tanstack/react-router";

import { Actions } from "../actions";
import {
  BooleanField,
  DateField,
  TagField,
  TextField,
  UrlField,
} from "../fields";

export function useIssuesColumns(): TableColumnsType<IssueList> {
  const { hide } = useSearch({ from: "/dashboard/issues/" });

  // Permissions
  const can = useCan();
  const canEdit = can("update_as_admin", "Issue");
  const canDelete = can("delete", "Issue");
  const canShow = can("view", "Issue");
  const canActions = canEdit || canDelete || canShow;

  const { mutateAsync: deleteIssue, isPending } = useIssueDelete();

  const onDelete = useCallback(
    (id: number) => {
      deleteIssue(id)
        .then(() => toast.success("Issue deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar issue"));
    },
    [deleteIssue]
  );

  const columns = useMemo<TableColumnsType<IssueList>>(
    () => [
      {
        key: "experiment_id",
        title: "ID",
        dataIndex: "experiment_id",
        width: 80,
        sorter: true,
        render: (value: number) => (
          <UrlField
            value={value.toString()}
            href={`/dashboard/labs/show/${value}`}
            target="_blank"
          />
        ),
        hidden: hide?.includes("experiment_id"),
      },
      {
        key: "problem",
        title: "Problema",
        dataIndex: "problem",
        ellipsis: { showTitle: false },
        width: 150,
        sorter: true,
        render: (value) => <TextField value={value} />,
        hidden: hide?.includes("problem"),
      },
      {
        key: "priority",
        title: "Gravidade",
        dataIndex: "priority",
        align: "center",
        width: 120,
        sorter: true,
        render: (value) => handlePriority(value),
        hidden: hide?.includes("priority"),
      },
      {
        key: "version",
        title: "Versão",
        dataIndex: "version",
        width: 100,
        sorter: true,
        render: (value) => <TextField value={completeVersion(value)} />,
        hidden: hide?.includes("version"),
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status",
        width: 130,
        render: (value) => (
          <TagField color={getUniqueColor(value)} value={value} />
        ),
        hidden: hide?.includes("status"),
      },
      {
        key: "approved",
        title: "Aprovado",
        dataIndex: "approved",
        align: "center",
        width: 100,
        render: (value) => <BooleanField value={value} />,
        hidden: hide?.includes("approved"),
      },
      {
        key: "creator",
        title: "Autor",
        dataIndex: "creator",
        ellipsis: { showTitle: false },
        width: 120,
        render: (value) => <TextField value={value} />,
        hidden: hide?.includes("creator"),
      },
      {
        key: "issueTags",
        title: "Ambiente",
        dataIndex: "issueTags",
        filteredValue: undefined,
        width: 100,
        render: (values: string[]) =>
          values.map((tag) => (
            <TagField key={nanoid()} value={tag} color={getUniqueColor(tag)} />
          )),
        hidden: hide?.includes("issueTags"),
      },
      {
        key: "responsible",
        title: "Responsável",
        dataIndex: "responsible",
        ellipsis: { showTitle: false },
        width: 120,
        render: (value) => <TextField value={value} />,
        hidden: hide?.includes("responsible"),
      },
      {
        key: "created_at",
        title: "Criação",
        dataIndex: "created_at",
        filteredValue: undefined,
        width: 100,
        render: (value) => <DateField value={value} />,
        sorter: true,
        hidden: hide?.includes("created_at"),
      },
      {
        title: "Ações",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        width: 150,
        filteredValue: undefined,
        fixed: "right",
        hidden: !canActions || hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="issues"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
            isNewPage
            IsShowNewPage
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, canShow, hide, isPending, onDelete]
  );

  return columns;
}
