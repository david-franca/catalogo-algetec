import { Card } from "antd";

import { useDemandList } from "@/services/demand.service";

import { DataTable } from "../../../../components/data-table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDemandColumns } from "@/components/columns";

export function DemandTable() {
  const { data, isLoading } = useDemandList();
  const columns = useDemandColumns();
  const navigate = useNavigate({ from: "/dashboard/demands" });
  const { limit } = useSearch({ from: "/dashboard/demands/" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        pagination={{
          total: data?.meta.total,
          current: data?.meta.current_page,
          pageSize: limit,
        }}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} entregas`
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
