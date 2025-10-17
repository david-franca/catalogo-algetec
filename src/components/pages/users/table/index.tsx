import { Card } from "antd";

import { DataTable } from "@/components/data-table";
import { useUserList } from "@/services/user.service";
import { useUserColumns } from "@/components/columns";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function UserTable() {
  const { data, isLoading } = useUserList();
  const columns = useUserColumns();
  const { limit } = useSearch({ from: "/dashboard/users/" });
  const navigate = useNavigate({ from: "/dashboard/users" });

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} usuários`
        }
        pagination={{
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
