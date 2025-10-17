import {
  Button,
  Card,
  Col,
  Popover,
  Row,
  Space,
  TableColumnsType,
  Typography,
} from "antd";
import { Key, useMemo } from "react";

import { useCan } from "@/hooks";
import { ExperimentStatus } from "@/types/experiment";
import { getUniqueColor } from "@/utils";
import { handleStatus } from "@/utils/handleStatus";
import { sortByDate } from "@/utils/sortDate";
import {
  EditOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

import { BooleanField, DateField, TagField, TextField } from "../fields";
import { useSearch } from "@tanstack/react-router";

interface DataType {
  issueCounts: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  key: Key;
  id: string;
  name: string;
  pt: boolean;
  en: boolean;
  es: boolean;
  web: boolean;
  ios: boolean;
  android: boolean;
  status: ExperimentStatus;
  image?: string;
  link: string;
  created_at: string;
  updated_at: string;
  approved: boolean;
}

export function useLabColumns() {
  const { hide } = useSearch({ from: "/dashboard/labs/" });
  const navigate = useNavigate();
  // Permissions
  const can = useCan();
  const canView = can("view", "Experiment");

  const columns = useMemo<TableColumnsType<DataType>>(
    () => [
      {
        key: "id",
        title: "ID",
        dataIndex: "id",
        render: (value) => <TextField value={value} />,
        fixed: "left",
        width: 80,
        sorter: (a, b) => a.id.localeCompare(b.id),
        hidden: hide?.includes("id"),
      },
      {
        key: "name",
        title: "Nome",
        dataIndex: "name",
        render: (value) => <TextField value={value} />,
        ellipsis: { showTitle: false },
        width: 180,
        sorter: (a, b) => a.name.localeCompare(b.name),
        fixed: "left",
        hidden: hide?.includes("name"),
      },
      {
        key: "issueCounts",
        dataIndex: "issueCounts",
        filteredValue: null,
        render: (value) => (
          <TextField
            style={{ fontWeight: "bolder" }}
            value={`${value.critical}C - ${value.high}A - ${value.medium}N - ${value.low}B`}
          />
        ),
        ellipsis: { showTitle: false },
        width: 230,
        align: "center",
        hidden: hide?.includes("issueCounts"),
        title: (
          <Space>
            Problemas não resolvidos
            <Popover
              content={
                <Card title="Níveis de problemas:" style={{ width: 400 }}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <TagField value="C" />
                      <Typography.Text>crítico</Typography.Text>
                    </Col>
                    <Col span={12}>
                      <TagField value="A" />
                      <Typography.Text>alto</Typography.Text>
                    </Col>
                    <Col span={12}>
                      <TagField value="N" />
                      <Typography.Text>normal</Typography.Text>
                    </Col>
                    <Col span={12}>
                      <TagField value="B" />
                      <Typography.Text>baixo</Typography.Text>
                    </Col>
                  </Row>
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        sorter: (a, b) => {
          const firstElement = a.issueCounts;
          const secondElement = b.issueCounts;

          if (firstElement.critical !== secondElement.critical) {
            return firstElement.critical - secondElement.critical;
          }

          if (firstElement.high !== secondElement.high) {
            return firstElement.high - secondElement.high;
          }

          if (firstElement.medium !== secondElement.medium) {
            return firstElement.medium - secondElement.medium;
          }

          if (firstElement.low !== secondElement.low) {
            return firstElement.low - secondElement.low;
          }

          return 0;
        },
      },
      {
        key: "approved",
        title: "Aprovado",
        dataIndex: "approved",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("approved"),
      },
      {
        key: "pt",
        title: "Português",
        dataIndex: "pt",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 120,
        hidden: hide?.includes("pt"),
      },
      {
        key: "en",
        title: "Inglês",
        dataIndex: "en",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("en"),
      },
      {
        key: "es",
        title: "Espanhol",
        dataIndex: "es",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("es"),
      },
      {
        key: "web",
        title: "Web",
        dataIndex: "web",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("web"),
      },
      {
        key: "android",
        title: "Android",
        dataIndex: "android",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("android"),
      },
      {
        key: "ios",
        title: "Ios",
        dataIndex: "ios",
        render: (value) => <BooleanField value={value} />,
        align: "center",
        width: 100,
        hidden: hide?.includes("ios"),
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status",
        width: 150,
        hidden: hide?.includes("status"),
        render: (value) => (
          <TagField
            value={handleStatus(value)}
            color={getUniqueColor(handleStatus(value))}
          />
        ),
        sorter: (a, b) =>
          handleStatus(a.status).localeCompare(handleStatus(b.status)),
        showSorterTooltip: false,
      },
      {
        key: "created_at",
        title: "Criação",
        dataIndex: "created_at",
        hidden: hide?.includes("created_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
        width: 120,
        sorter: (a, b) => sortByDate(a.created_at, b.created_at),
      },
      {
        key: "updated_at",
        title: "Atualização",
        dataIndex: "updated_at",
        hidden: hide?.includes("updated_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
        width: 120,
        sorter: (a, b) => sortByDate(a.updated_at, b.updated_at),
      },
      {
        title: "Ações",
        dataIndex: "actions",
        filteredValue: null,
        key: "actions",
        hidden: hide?.includes("actions"),
        width: 150,
        fixed: "right",
        align: "center",
        render: (_, record) => (
          <Space>
            {canView && (
              <Button
                icon={<EyeOutlined />}
                color="default"
                variant="outlined"
                onClick={() =>
                  navigate({
                    to: "/dashboard/labs/show/$id",
                    params: { id: record.id.toString() },
                  })
                }
              />
            )}
            <Button
              color="primary"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() =>
                window.open(
                  `https://catalogoalgetec.grupoa.education/dashboard/experiments/edit?id=[${record.id}]`,
                  "_blank"
                )
              }
            />
          </Space>
        ),
      },
    ],
    [canView, hide, navigate]
  );

  return columns;
}
