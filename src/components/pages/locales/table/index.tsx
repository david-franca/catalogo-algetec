import { Card } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { Key } from "react";

import { useLocalesColumns } from "@/components/columns/useLocalesColumns";
import { DataTable } from "@/components/data-table";
import { useLocalesEdit } from "@/hooks/useLocalesEdit";
import { LocaleList, useLocalesList } from "@/services/locale.service";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function LocalesTable() {
  const columns = useLocalesColumns();
  const { data, isLoading } = useLocalesList();
  const navigate = useNavigate({ from: "/dashboard/locales" });
  const { limit } = useSearch({ from: "/dashboard/locales/" });
  const { selectedRowKeys, setMassEditId, setSelectedRowKeys } =
    useLocalesEdit();

  const onSelectChange = (
    newSelectedRowKeys: Key[],
    selectedRows: LocaleList[]
  ) => {
    const experimentIds = selectedRows.map((row) => row.experiment_id);
    const isSameExperimentId = experimentIds.every(
      (id) => id === experimentIds[0]
    );

    if (!isSameExperimentId) {
      setMassEditId(null);
    } else {
      setMassEditId(experimentIds[0]);
    }

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<LocaleList> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled:
        selectedRowKeys && selectedRowKeys.length
          ? data?.data.find((item) => item.key === selectedRowKeys[0])
              ?.experiment_id !== record.experiment_id
          : false,
    }),
  };

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} localizações`
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
        rowSelection={rowSelection}
      />
    </Card>
  );
}
