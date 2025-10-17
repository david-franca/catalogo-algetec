import { Card } from "antd";

import { useChecklistColumns } from "@/components/columns/useChecklistColumns";
import { DataTable } from "@/components/data-table";
import { useChecklistList } from "@/services/checklist.service";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function ChecklistTable() {
  const { data, isLoading } = useChecklistList();
  const columns = useChecklistColumns();
  const { limit } = useSearch({ from: "/dashboard/checklists/" });
  const navigate = useNavigate({ from: "/dashboard/checklists" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: limit,
        }}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} tarefas`
        }
        onChange={(pagination, _, sorter) => {
          if (Array.isArray(sorter)) return;

          navigate({
            search: (prev) => ({
              ...prev,
              page: pagination?.current,
              limit: pagination?.pageSize,
              field: sorter?.field?.toString(),
              order: sorter?.field
                ? sorter?.order === "ascend"
                  ? "asc"
                  : "desc"
                : undefined,
            }),
          });
        }}
      />
    </Card>
  );
}
