import { TableColumnsType } from "antd";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import { useDocumentDelete } from "@/services/documents.service";
import { DocumentList } from "@/types/documents";

import { Actions } from "../actions";
import { DateField, TextField } from "../fields";
import { useSearch } from "@tanstack/react-router";

export function useDocumentsColumns() {
  const { hide } = useSearch({ from: "/dashboard/documents/" });
  // Permissions
  const can = useCan();
  const canShow = can("view", "Template");
  const canEdit = can("update", "Template");
  const canDelete = can("delete", "Template");

  const { mutateAsync, isPending } = useDocumentDelete();

  const onDelete = useCallback(
    (id: number) => {
      mutateAsync(id)
        .then(() => toast.success("Documento deletado com sucesso"))
        .catch(() => toast.error("Erro ao deletar documento"));
    },
    [mutateAsync]
  );

  const columns = useMemo<TableColumnsType<DocumentList>>(
    () => [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        sorter: true,
        render: (value) => <TextField value={value} />,
        hidden: hide?.includes("name"),
      },
      {
        title: "Criado em",
        dataIndex: "createdAt",
        key: "createdAt",
        hidden: hide?.includes("createdAt"),
        sorter: true,
        render: (value) => <DateField value={value} format="DD/MM/YYYY" />,
      },
      {
        title: "Atualizado em",
        dataIndex: "updatedAt",
        key: "updatedAt",
        hidden: hide?.includes("updatedAt"),
        sorter: true,
        render: (value) => <DateField value={value} format="DD/MM/YYYY" />,
      },
      {
        title: "Ações",
        key: "actions",
        dataIndex: "actions",
        align: "center",
        hidden: hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="documents"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canDelete, canEdit, canShow, hide, isPending, onDelete]
  );

  return columns;
}
