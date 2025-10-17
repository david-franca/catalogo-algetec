import {
  Button,
  Card,
  Descriptions,
  List,
  Popconfirm,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { nanoid } from "nanoid";
import { useState } from "react";

import { usePracticesColumns } from "@/components/columns/usePracticesColumns";
import { DataTable } from "@/components/data-table";
import { TagField } from "@/components/fields";
import { usePracticeList } from "@/services/practices.service";
import { PracticeList } from "@/types/practice";
import { cn, getUniqueColor } from "@/utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

export function PracticesTable() {
  const { data, isLoading } = usePracticeList();
  const { columns, onDelete, canDelete, canEdit, isPending } =
    usePracticesColumns();
  const navigate = useNavigate();

  const [currentSource, setCurrentSource] = useState<PracticeList[]>(
    data || []
  );

  return (
    <Space direction="vertical">
      <Card styles={{ body: { padding: 16 } }}>
        <DataTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          showTotalText={(total, range) =>
            `${range[0]}-${range[1]} de ${total} práticas`
          }
          onChange={(_pagination, _filters, _sorter, currentTable) => {
            setCurrentSource(currentTable.currentDataSource as PracticeList[]);
          }}
        />
      </Card>
      <Card>
        <List
          dataSource={currentSource.length ? currentSource : data}
          renderItem={(item) => (
            <List.Item key={nanoid()}>
              <Descriptions
                title={item.name}
                extra={
                  <Space>
                    <Tooltip title="Editar">
                      <Button
                        className={cn({ hidden: !canEdit })}
                        color="primary"
                        variant="outlined"
                        icon={<EditOutlined />}
                        onClick={() => {
                          navigate({
                            to: "/dashboard/curriculums/practices/edit/$id",
                            params: { id: item.id.toString() },
                          });
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <Popconfirm
                        title={"Você tem certeza?"}
                        onConfirm={() => onDelete(item.id)}
                        okText="Deletar"
                        cancelText="Cancelar"
                        okButtonProps={{
                          color: "danger",
                          variant: "outlined",
                          loading: isPending,
                        }}
                      >
                        <Button
                          className={cn({ hidden: !canDelete })}
                          color="danger"
                          variant="outlined"
                          icon={<DeleteOutlined />}
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Space>
                }
                layout="vertical"
                column={{ sm: 1, md: 2, lg: 2, xs: 1, xl: 2, xxl: 2 }}
                bordered
                className="w-full"
              >
                <Descriptions.Item
                  label="Código"
                  contentStyle={{ width: "50%" }}
                >
                  <Typography.Text type="secondary">
                    {item.code}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label="Descrição"
                  contentStyle={{ width: "50%" }}
                >
                  <Typography.Text type="secondary">
                    {item.description}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Laboratório">
                  <Typography.Text type="secondary">
                    {item.experiment_name}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Áreas" span={2}>
                  <Space size="small" wrap>
                    {item.areas.map((area) => (
                      <TagField
                        key={nanoid()}
                        value={area}
                        color={getUniqueColor(area)}
                      />
                    ))}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Habilidades">
                  <Space size="small" wrap>
                    {item.skills.map((skill) => (
                      <TagField
                        key={nanoid()}
                        value={skill}
                        color={getUniqueColor(skill)}
                      />
                    ))}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}
