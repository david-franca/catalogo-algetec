import { useIssuesColumns } from "@/components/columns/useIssueColumns";
import { DataTable } from "@/components/data-table";
import { useIssueList } from "@/services/issue.service";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Card } from "antd";

export function IssueTable() {
  const columns = useIssuesColumns();
  const { data, isLoading } = useIssueList();
  const { limit } = useSearch({ from: "/dashboard/issues/" });
  const navigate = useNavigate({ from: "/dashboard/issues" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} problemas`
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
