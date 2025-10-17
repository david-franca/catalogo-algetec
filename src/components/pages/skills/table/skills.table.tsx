import {
  Button,
  Card,
  Descriptions,
  List,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";

import { useSkillsColumns } from "@/components/columns/useSkillsColumns";
import { DataTable } from "@/components/data-table";
import { TagField } from "@/components/fields";
import { useSkillList } from "@/services/skills.service";
import { SkillList } from "@/types/skills";
import { getUniqueColor } from "@/utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface SkillsTableProps {
  filter?: string;
}

export function SkillsTable({ filter }: SkillsTableProps) {
  const { columns, showDeleteConfirm } = useSkillsColumns();
  const { data, isLoading } = useSkillList();
  const { limit } = useSearch({ from: "/dashboard/curriculums/skills/" });
  const navigate = useNavigate({ from: "/dashboard/curriculums/skills" });

  const [currentSource, setCurrentSource] = useState<SkillList[] | undefined>(
    data
  );

  const filterSource = useCallback(
    (source: SkillList[] | undefined) => {
      if (!source) return [];
      if (filter === "objects") {
        return source.filter((skill) =>
          skill.objects.some((obj) => obj.practices.length === 0)
        );
      }
      if (filter === "skills") {
        return source.filter((skill) => skill.practices.length === 0);
      }
      return source;
    },
    [filter]
  );

  useEffect(() => {
    if (filter === "objects") {
      setCurrentSource(filterSource(data));
    }
    if (filter === "skills") {
      setCurrentSource(filterSource(data));
    }
    if (!filter) {
      setCurrentSource(data);
    }
  }, [filter, data, filterSource]);

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
      <Card className="drop-shadow-lg">
        <List
          dataSource={currentSource?.length ? currentSource : data}
          pagination={{
            defaultPageSize: 50,
            pageSizeOptions: [50, 100, 200, 500],
            showTotal(total, range) {
              return `${range[0]}-${range[1]} de ${total} habilidades`;
            },
          }}
          renderItem={(item) => (
            <List.Item key={nanoid()}>
              <Descriptions
                title={`Código da Habilidade: ${item.code}`}
                extra={
                  <Space>
                    <Tooltip title="Editar">
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          navigate({
                            to: "/dashboard/curriculums/skills/edit/$id",
                            params: { id: item.id.toString() },
                          });
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <Button
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          showDeleteConfirm(item.id);
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                layout="vertical"
                column={3}
                bordered
                className="w-full"
              >
                <Descriptions.Item label="Currículo">
                  <Typography.Text type="secondary">
                    {item.competenceCurriculumName}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Área de Competência">
                  <Typography.Text type="secondary">
                    {item.competenceAreaName}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Código da Competência">
                  <Typography.Text type="secondary">
                    {item.competenceCode}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Descrição da Competência" span={3}>
                  <Typography.Text type="secondary">
                    {item.competenceDescription}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Descrição da Habilidade" span={3}>
                  <Typography.Text type="secondary">
                    {item.description}
                  </Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Objetos de Conhecimento" span={3}>
                  <Space direction="vertical">
                    {item.objects.filter((obj) => obj.practices.length === 0)
                      .length > 0 ? (
                      <Space direction="vertical" key={nanoid()}>
                        <Typography.Text type="secondary">
                          Sem Práticas
                        </Typography.Text>
                        <Space size="small" wrap>
                          {item.objects
                            .filter((obj) => obj.practices.length === 0)
                            .map((objects) => (
                              <TagField
                                key={nanoid()}
                                value={objects.name}
                                color={getUniqueColor(objects.name)}
                              />
                            ))}
                        </Space>
                      </Space>
                    ) : null}
                    {item.objects.filter((obj) => obj.practices.length > 0)
                      .length > 0 ? (
                      <Space direction="vertical" key={nanoid()}>
                        <Typography.Text type="secondary">
                          Com Práticas
                        </Typography.Text>
                        <Space size="small" wrap>
                          {item.objects
                            .filter((obj) => obj.practices.length > 0)
                            .map((objects) => (
                              <TagField
                                key={nanoid()}
                                value={objects.name}
                                color={getUniqueColor(objects.name)}
                              />
                            ))}
                        </Space>
                      </Space>
                    ) : null}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Unidades Temáticas" span={3}>
                  <Space size="small" wrap>
                    {item.unites.map((unite) => (
                      <TagField
                        key={nanoid()}
                        value={unite}
                        color={getUniqueColor(unite)}
                      />
                    ))}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Práticas" span={3}>
                  <Space direction="vertical">
                    {item.practices.length ? (
                      <Space direction="vertical" key={nanoid()}>
                        <Typography.Text type="secondary">
                          Práticas da Habilidade
                        </Typography.Text>
                        <Space size="small" wrap>
                          {item.practices.map((practice) => (
                            <TagField
                              key={nanoid()}
                              value={`${practice.code} | ${practice.experimentId} | ${practice.name}`}
                              color={getUniqueColor(
                                `${practice.code} | ${practice.experimentId} | ${practice.name}`
                              )}
                            />
                          ))}
                        </Space>
                      </Space>
                    ) : null}
                    {item.objects.map((object) =>
                      object.practices.length ? (
                        <Space direction="vertical" key={nanoid()}>
                          <Typography.Text type="secondary">
                            Prática{object.practices.length > 1 ? "s" : null} do
                            Objeto: {object.name}
                          </Typography.Text>
                          <Space size="small" wrap>
                            {object.practices.map((practice) => (
                              <TagField
                                key={nanoid()}
                                value={`${practice.code} | ${practice.experiment_id} | ${practice.name}`}
                                color={getUniqueColor(
                                  `${practice.code} | ${practice.experiment_id} | ${practice.name}`
                                )}
                              />
                            ))}
                          </Space>
                        </Space>
                      ) : null
                    )}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Notas" span={3}>
                  <Typography.Text type="secondary">
                    {item.notes}
                  </Typography.Text>
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}
