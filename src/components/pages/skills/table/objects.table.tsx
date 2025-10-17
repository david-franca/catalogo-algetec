import { Card, Space } from "antd";

import { useObjectsColumns } from "@/components/columns/useObjectsColumns";
import { DataTable } from "@/components/data-table";
import { useObjectsList } from "@/services/object.service";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function ObjectsTableList() {
  const columns = useObjectsColumns();
  const { data, isLoading } = useObjectsList();
  const { limit } = useSearch({ from: "/dashboard/curriculums/objects/" });
  const navigate = useNavigate({ from: "/dashboard/curriculums/objects" });
  return (
    <Space direction="vertical" className="w-full">
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
      <Card className="drop-shadow-lg"></Card>
    </Space>
  );
}
