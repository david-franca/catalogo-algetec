import { Table, TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { TablePaginationConfig } from "antd/lib";
import { Key, useState } from "react";

interface DataTableProps<T extends object> extends TableProps<T> {
  showTotalText?: (total: number, range: [number, number]) => string;
}

export function DataTable<T extends object>({
  pagination,
  onChange,
  rowSelection: propRowSelection,
  showTotalText,
  ...rest
}: DataTableProps<T>) {
  // Estado para armazenar as chaves das linhas selecionadas
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  // Função de callback ao alterar a seleção
  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Configuração de seleção de linhas
  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Mesclar as configurações de paginação padrão com as propriedades recebidas
  const mergedPagination: TablePaginationConfig = {
    position: ["bottomCenter"],
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    showTotal: (total, range) =>
      showTotalText
        ? showTotalText(total, range)
        : `${range[0]}-${range[1]} de ${total} itens`,
    ...pagination,
  };

  return (
    <Table<T>
      size="small"
      scroll={{ x: 1000, y: "calc(100vh - 400px)" }}
      rowSelection={propRowSelection ?? rowSelection}
      pagination={mergedPagination}
      onChange={(...args) => {
        if (selectedRowKeys.length) {
          setSelectedRowKeys([]);
        }
        onChange?.(...args);
      }}
      {...rest}
    />
  );
}
