import { Card, Descriptions, DescriptionsProps } from "antd";
import { useMemo } from "react";
import { DateField } from "@/components/fields";
import { useDepartmentSelect } from "@/services/department.service";
import { useRoleSelect } from "@/services/role.service";
import { useUser } from "@/services/user.service";
import { useParams } from "@tanstack/react-router";

export function UserShowForm() {
  const { id } = useParams({ from: "/dashboard/users/show/$id" });
  const { data: user, isLoading: userLoading, isFetching } = useUser(id);
  const { data: roles, isLoading: rolesLoading } = useRoleSelect(user?.role_id);
  const { data: department, isLoading: departmentLoading } =
    useDepartmentSelect("id", user?.department_id);

  const isLoading = useMemo(
    () => userLoading || rolesLoading || departmentLoading || isFetching,
    [userLoading, rolesLoading, departmentLoading, isFetching]
  );

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Nome",
      children: user?.name,
      span: 3,
    },
    {
      key: "2",
      label: "E-mail",
      children: user?.email,
      span: 3,
    },
    {
      key: "3",
      label: "Cargo",
      children: roles?.[0].label,
      span: 3,
    },
    {
      key: "4",
      label: "Departamento",
      span: 3,
      children: department?.[0].label,
    },
    {
      key: "5",
      label: "Criado em",
      span: 3,
      children: <DateField value={user?.created_at} />,
    },
    {
      key: "6",
      label: "Atualizado em",
      span: 3,
      children: <DateField value={user?.updated_at} />,
    },
  ];

  return (
    <Card loading={isLoading}>
      <Descriptions layout="vertical" items={items} />
    </Card>
  );
}
