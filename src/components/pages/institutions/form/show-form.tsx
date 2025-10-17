import { Card, Descriptions, DescriptionsProps } from "antd";

import { useInstitution } from "@/services/institutions.service";
import { useParams } from "@tanstack/react-router";

export function InstitutionShowForm() {
  const { id } = useParams({ from: "/dashboard/institutions/show/$id" });
  const { data: institution, isLoading, isFetching } = useInstitution(id);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ID",
      children: institution?.id,
      span: 3,
    },
    {
      key: "1",
      label: "Nome",
      children: institution?.name,
      span: 3,
    },
  ];

  return (
    <Card loading={isLoading || isFetching}>
      <Descriptions layout="vertical" items={items} />
    </Card>
  );
}
