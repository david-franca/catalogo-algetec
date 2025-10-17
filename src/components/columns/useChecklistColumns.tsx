import { Avatar, TableColumnsType, Tooltip } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import { useChecklistDelete } from "@/services/checklist.service";
import { ChecklistList } from "@/types/checklist";
import { getUniqueColor } from "@/utils";

import { Actions } from "../actions";
import { useSearch } from "@tanstack/react-router";

export function useChecklistColumns() {
  const { mutateAsync: deleteChecklist, isPending } = useChecklistDelete();
  const { hide, name } = useSearch({ from: "/dashboard/checklists/" });

  const onDelete = useCallback(
    (id: number) => {
      deleteChecklist(id)
        .then(() => toast.success("Checklist deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar checklist"));
    },
    [deleteChecklist]
  );

  const can = useCan();
  const canEdit = can("update", "Checklist");
  const canDelete = can("delete", "Checklist");
  const canActions = canEdit || canDelete;

  const columns = useMemo<TableColumnsType<ChecklistList>>(
    () => [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
        showSorterTooltip: false,
        sorter: {
          compare: (a, b) => a.name.localeCompare(b.name),
        },
        filteredValue: name ? [name] : null,
        onFilter: (_, record) =>
          name ? record.name.toLowerCase().includes(name.toLowerCase()) : false,
        hidden: hide?.includes("name"),
      },
      {
        title: "Time Padrão",
        dataIndex: "departments",
        key: "departments",
        hidden: hide?.includes("departments"),
        render: (values: string[]) => (
          <Avatar.Group>
            {values.map((value) => (
              <Tooltip key={nanoid()} title={value} placement="topLeft">
                <Avatar style={{ backgroundColor: getUniqueColor(value) }}>
                  {value.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        ),
      },
      {
        title: "Ações",
        align: "center",
        dataIndex: "actions",
        key: "actions",
        hidden: !canActions || hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="checklists"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            onDelete={() => onDelete(record.id)}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, hide, isPending, name, onDelete]
  );

  return columns;
}
