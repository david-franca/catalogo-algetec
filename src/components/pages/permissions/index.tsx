import { Col, Row, Select, Tabs, TabsProps } from "antd";
import { useState } from "react";

import { useDepartmentSelect } from "@/services/department.service";
import {
  useGetDepartmentPermissions,
  useGetRolePermissions,
  useGetUserPermissions,
} from "@/services/security.service";
import { useUserSelect } from "@/services/user.service";
import { useRoleSelect } from "@/services/role.service";
import { PermissionsForm } from "./form";

export function PermissionsPage() {
  // Estados para controlar os selects
  const [departmentId, setDepartmentId] = useState<number>();
  const [roleId, setRoleId] = useState<number>();
  const [userId, setUserId] = useState<number>();

  // Query's para popular os formulários
  const { data: rolePermissions } = useGetRolePermissions(roleId);
  const { data: departmentPermissions } =
    useGetDepartmentPermissions(departmentId);
  const { data: userPermissions } = useGetUserPermissions(userId);

  // Query's para popular os selects
  const { data: roles } = useRoleSelect();
  const { data: users } = useUserSelect();
  const { data: departments } = useDepartmentSelect();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Nível de Acesso",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="Selecione um nível de acesso"
              className="w-full"
              options={roles}
              onChange={(value) => setRoleId(value)}
            />
          </Col>
          <Col span={24}>
            <PermissionsForm permissions={rolePermissions} roleId={roleId} />
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Departamento",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              showSearch
              placeholder="Selecione um departamento"
              optionFilterProp="label"
              className="w-full"
              options={departments}
              onChange={(value) => setDepartmentId(value)}
            />
          </Col>
          <Col span={24}>
            <PermissionsForm
              permissions={departmentPermissions}
              departmentId={departmentId}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: "3",
      label: "Usuários",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              showSearch
              placeholder="Selecione um usuário"
              optionFilterProp="label"
              className="w-full"
              options={users}
              onChange={(value) => setUserId(value)}
            />
          </Col>
          <Col span={24}>
            <PermissionsForm permissions={userPermissions} userId={userId} />
          </Col>
        </Row>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
