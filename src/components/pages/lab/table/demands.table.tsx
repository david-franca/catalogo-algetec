import { DateField, TagField, TextField } from "@/components/fields";
import { useAuth } from "@/hooks";
import { DemandStatus } from "@/types/demand";
import { ExperimentDemand } from "@/types/experiment";
import { getUniqueColor } from "@/utils";
import { sortByDate } from "@/utils/sortDate";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

import { Button, Progress, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { nanoid } from "nanoid";

interface DemandsTableProps {
  dataSource: ExperimentDemand[];
  loading: boolean;
}

export function DemandsTable({ dataSource, loading }: DemandsTableProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStatusName = (status: DemandStatus) => {
    let color = "";
    switch (status) {
      case DemandStatus.READY:
        color = "#2b9a66";
        break;
      case DemandStatus.DEVELOPMENT:
        color = "#0588f0";
        break;
      case DemandStatus.CORRECTION:
        color = "#ef5f00";
        break;
      case DemandStatus.REVALIDATION:
        color = "#74daf8";
        break;
      case DemandStatus.VALIDATION:
        color = "#b0e64c";
        break;
      default:
        break;
    }
    return color;
  };

  const columns: ColumnsType<ExperimentDemand> = [
    {
      title: "Instituição",
      dataIndex: ["institutions", "name"],
      key: "institution_id",
      ellipsis: true,
      width: 150,
      render: (value) => <TextField value={value} />,
    },
    {
      title: "Tags",
      dataIndex: "demandTags",
      key: "tags",
      width: 170,
      filterSearch: true,
      render: (tags: ExperimentDemand["demandTags"]) => (
        <Space
          size="middle"
          wrap
          style={{ wordWrap: "break-word", wordBreak: "break-word" }}
        >
          {tags?.map((tag) => (
            <TagField
              value={tag.name}
              color={getUniqueColor(tag.name)}
              key={nanoid()}
            />
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      filterSearch: true,
      filters: Object.values(DemandStatus).map((value) => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.status.startsWith(`${value}`),
      render: (value: DemandStatus, record) => (
        <TagField value={value} color={handleStatusName(record.status)} />
      ),
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
      },
    },
    {
      title: "Prazo",
      key: "finished_at",
      dataIndex: "finished_at",
      width: 110,
      render: (value) => <DateField value={value} />,
      sorter: {
        compare: (a, b) => sortByDate(a.finished_at, b.finished_at),
      },
    },
    {
      title: "Roteirização",
      dataIndex: "scripting",
      key: "scripting",
      width: 120,
      sorter: {
        compare: (a, b) => a.scripting - b.scripting,
      },
      render: (value: number) => <Progress percent={value} size="small" />,
    },
    {
      title: "Modelagem",
      dataIndex: "modeling",
      key: "modeling",
      width: 120,
      sorter: {
        compare: (a, b) => a.modeling - b.modeling,
      },
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo />
      ),
    },
    {
      title: "Programação",
      dataIndex: "coding",
      key: "coding",
      width: 120,
      sorter: {
        compare: (a, b) => a.coding - b.coding,
      },
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo />
      ),
    },
    {
      title: "Testes",
      dataIndex: "testing",
      key: "testing",
      width: 120,
      sorter: {
        compare: (a, b) => a.testing - b.testing,
      },
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo />
      ),
    },
    {
      title: "UALAB",
      dataIndex: "ualab",
      key: "ualab",
      width: 120,
      sorter: {
        compare: (a, b) => a.ualab - b.ualab,
      },
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo />
      ),
    },
    {
      title: "Ações",
      key: "actions",
      dataIndex: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() =>
                navigate({
                  to: `/dashboard/demands/edit/$id`,
                  params: {
                    id: record.id.toString(),
                  },
                })
              }
            />
          </Tooltip>
          {user?.role.super_admin ? (
            <Tooltip title="Excluir">
              <Button
                danger
                type="primary"
                style={{
                  display: user?.role.super_admin ? "inline" : "none",
                }}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      className="w-full"
      size="small"
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: 1000, y: "72vh" }}
      pagination={{
        position: ["bottomCenter"],
        defaultPageSize: 100,
        pageSizeOptions: [100, 200, 500],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} de ${total} problemas`,
      }}
    />
  );
}
