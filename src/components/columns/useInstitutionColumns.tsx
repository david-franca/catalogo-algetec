import { TableColumnsType } from "antd";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import {
  InstitutionsList,
  useInstitutionDelete,
} from "@/services/institutions.service";
import { useSearch } from "@tanstack/react-router";

import { DateField, TextField } from "../../components/fields";
import { Actions } from "../actions";

export function useInstitutionColumns(): TableColumnsType<InstitutionsList> {
  const { hide, name } = useSearch({
    from: "/dashboard/institutions/",
  });
  const { mutateAsync, isPending } = useInstitutionDelete();
  const can = useCan();
  const canEdit = can("update", "Institution");
  const canDelete = can("delete", "Institution");
  const canShow = can("view", "Institution");
  const canActions = canEdit || canDelete || canShow;

  const onDelete = useCallback(
    (id: number) => {
      mutateAsync(id)
        .then(() => toast.success("Instituição deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar instituição"));
    },
    [mutateAsync]
  );

  const institutionColumns = useMemo<TableColumnsType<InstitutionsList>>(
    () => [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
        fixed: "left",
        width: 120,
        ellipsis: true,
        hidden: hide?.includes("name"),
        filteredValue: name ? [name] : null,
        onFilter: (_, record) =>
          name ? record.name.toLowerCase().includes(name.toLowerCase()) : false,
        sorter: {
          compare: (a, b) => a.name.localeCompare(b.name),
        },
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Data de Criação",
        dataIndex: "created_at",
        key: "created_at",
        width: 150,
        align: "center",
        hidden: hide?.includes("created_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
      },
      {
        title: "Data de Atualização",
        dataIndex: "updated_at",
        key: "updated_at",
        width: 170,
        align: "center",
        hidden: hide?.includes("updated_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
      },
      {
        title: "Ações",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        width: 100,
        filteredValue: null,
        hidden: !canActions || hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="institutions"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, canShow, hide, isPending, name, onDelete]
  );

  return institutionColumns;
}
