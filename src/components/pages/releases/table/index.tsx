import { useReleaseColumns } from "@/components/columns/useReleaseColumns";
import { DataTable } from "@/components/data-table";
import { useReleaseList } from "@/services/release.service";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Card } from "antd";

export function ReleaseTable() {
  const columns = useReleaseColumns();
  const { data, isLoading } = useReleaseList();
  const { limit } = useSearch({ from: "/dashboard/releases/" });
  const navigate = useNavigate({ from: "/dashboard/releases" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} versões`
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
