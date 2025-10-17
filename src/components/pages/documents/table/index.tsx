import { useDocumentsColumns } from "@/components/columns/useDocumentsColumns";
import { DataTable } from "@/components/data-table";
import { useDocumentsList } from "@/services/documents.service";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Card } from "antd";

export function DocumentsTable() {
  const { data, isLoading } = useDocumentsList();
  const columns = useDocumentsColumns();
  const { limit } = useSearch({ from: "/dashboard/documents/" });
  const navigate = useNavigate({ from: "/dashboard/documents" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} documentos`
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
