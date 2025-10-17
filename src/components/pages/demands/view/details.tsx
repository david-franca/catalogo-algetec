import { TagField } from "@/components/fields";
import { DemandShow } from "@/types/demand";
import { getUniqueColor } from "@/utils";
import { HandleDemand } from "@/utils/handleDemand";
import { Link } from "@tanstack/react-router";
import {
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  List,
  Progress,
  Row,
  Typography,
} from "antd";
import { nanoid } from "nanoid";
import { useMemo } from "react";

interface DetailsTabProps {
  demand?: DemandShow;
}

export function DetailsTab({ demand }: DetailsTabProps) {
  const demandShow = useMemo(
    () => (demand ? HandleDemand.toProduction(demand) : null),
    [demand]
  );

  const handleDeadline = (value: number | undefined) => {
    if (!value) return "";
    let hours = Number(value);
    const days = Math.floor(hours / 24);
    hours -= days * 24;
    if (days === 0) {
      return `${hours} horas`;
    }
    return hours > 0 ? `${days} dias e ${hours} horas` : `${days} dias`;
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "id",
      label: "ID",
      children: demand?.id,
    },
    {
      key: "lab",
      label: "Laboratório",
      children: (
        <Link to={`/dashboard/demands/edit/${demand?.id}`} target="_blank">
          {demand?.experiments.name}
        </Link>
      ),
    },
    {
      key: "status",
      label: "Status",
      children: (
        <TagField
          value={demand?.status}
          color={getUniqueColor(demand?.status)}
        />
      ),
    },
    {
      key: "institution",
      label: "Instituição",
      children: demand?.institutions.name,
    },
    {
      key: "author",
      label: "Autor",
      children: demand?.creator?.name,
    },
    {
      key: "tags",
      label: "Tags",
      children: demand?.demandTags?.map((tag) => (
        <TagField
          key={tag.id}
          value={tag.name}
          color={getUniqueColor(tag.name)}
        />
      )),
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Descriptions layout="horizontal" items={items} bordered column={1} />
      </Col>
      <Col span={24}>
        {demandShow?.issues.length ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, column: 3 }}
            dataSource={demandShow?.issues}
            renderItem={(issue) => (
              <List.Item key={nanoid()} className="w-full">
                <Card className="w-full" title={issue.title} type="inner">
                  <Typography.Text>{issue.approved}</Typography.Text>
                  <br />
                  <Typography.Text>{issue.status}</Typography.Text>
                </Card>
              </List.Item>
            )}
          />
        ) : null}
      </Col>
      {demandShow?.production.map((phase) => (
        <Col sm={24} xs={24} md={24} xl={12} key={nanoid()}>
          <Card>
            <Descriptions
              title={phase.type}
              layout="horizontal"
              column={1}
              items={[
                {
                  label: "Início",
                  children: phase.started_at
                    ? phase.started_at
                    : "Não Iniciado",
                },
                {
                  label: "Fim",
                  children: phase.finished_at
                    ? phase.finished_at
                    : "Não Finalizado",
                },
                {
                  label: "Prazo",
                  children: handleDeadline(phase.deadline),
                },
                {
                  label: "Progresso",
                  children: <Progress percent={phase.progress as number} />,
                },
                { label: "Responsável", children: phase.responsible },
              ]}
              bordered
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
