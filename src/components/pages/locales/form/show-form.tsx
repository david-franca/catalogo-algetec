import { Card, Col, Descriptions, DescriptionsProps, Row } from "antd";
import { useMemo } from "react";

import { DateField } from "@/components/fields";
import { useLocalesShow } from "@/services/locale.service";
import { completeVersion } from "@/utils/completeVersion";
import { handleLanguageName } from "@/utils/handleLanguageName";
import { useParams, useSearch } from "@tanstack/react-router";

export function LocaleShowForm() {
  const { id } = useParams({ from: "/dashboard/locales/show/$id" });
  const { language, version } = useSearch({
    from: "/dashboard/locales/show/$id",
  });

  const { data, isLoading, isFetching } = useLocalesShow(id, language, version);

  const items = useMemo<DescriptionsProps["items"]>(
    () =>
      data
        ? [
            {
              label: "Idioma",
              children: handleLanguageName(data?.language),
              span: 2,
            },
            {
              label: "Versão",
              children: completeVersion(data?.version),
              span: 2,
            },
            { label: "Usuário", children: data?.user?.name, span: 4 },
            {
              label: "Criado em",
              children: (
                <DateField value={data?.created_at} format="DD/MM/YYYY HH:mm" />
              ),
              span: 2,
            },
            {
              label: "Atualizado em",
              children: (
                <DateField value={data?.updated_at} format="DD/MM/YYYY HH:mm" />
              ),
              span: 2,
            },
            { label: "Entradas", children: data.localePairs.length, span: 4 },
          ]
        : [],
    [data]
  );

  const pairItems = useMemo<DescriptionsProps["items"]>(
    () =>
      data?.localePairs.map((localePair) => ({
        label: localePair.key,
        children: localePair.value,
        span: 2,
      })),
    [data]
  );

  return (
    <Card loading={isLoading || isFetching}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Descriptions
              bordered
              title={`Experimento ${data?.experiment_id}`}
              items={items}
              column={4}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Descriptions
              bordered
              title="Chaves e Valores"
              column={2}
              items={pairItems}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
