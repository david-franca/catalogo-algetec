import { useLabColumns } from "@/components/columns/useLabColumns";
import { DataTable } from "@/components/data-table";
import { useLabList } from "@/services/lab.service";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Card } from "antd";

export function LabTable() {
  const { data, isLoading } = useLabList();
  const columns = useLabColumns();
  const { limit } = useSearch({ from: "/dashboard/labs/" });
  const navigate = useNavigate({ from: "/dashboard/labs" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} laboratórios`
        }
        pagination={{
          total: data?.meta.total,
          current: data?.meta.current_page,
          pageSize: limit,
        }}
        onChange={(pagination, _, sorter) => {
          if (Array.isArray(sorter)) return;

          navigate({
            search: (prev) => ({
              ...prev,
              page: pagination?.current,
              limit: pagination?.pageSize,
              field: sorter?.field?.toString(),
              order: sorter?.order === "ascend" ? "asc" : "desc",
            }),
          });
        }}
      />
    </Card>
  );
}
