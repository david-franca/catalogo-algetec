import { TableColumnsType } from "antd";
import { useMemo } from "react";

import {
  DateField,
  EmailField,
  TagField,
  TextField,
} from "@/components/fields";
import { useCan } from "@/hooks";
import { UserList } from "@/services/user.service";
import { getUniqueColor } from "@/utils/getUniqueColor";
import { handleTypeName } from "@/utils/handleTypeName";
import { useSearch } from "@tanstack/react-router";

import { Actions } from "../actions";

export function useUserColumns(): TableColumnsType<UserList> {
  const { departments, hide, roles, name } = useSearch({
    from: "/dashboard/users/",
  });

  const can = useCan();
  const canEdit = can("update_as_admin", "User");
  const canDelete = can("delete", "User");
  const canShow = can("view", "User");
  const canActions = canEdit || canDelete || canShow;

  const columns = useMemo<TableColumnsType<UserList>>(
    () => [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
        fixed: "left",
        width: 120,
        ellipsis: true,
        hidden: hide?.includes("name"),
        filteredValue: name ? [name] : null,
        onFilter: (_, record) =>
          name ? record.name.toLowerCase().includes(name.toLowerCase()) : false,
        sorter: {
          compare: (a, b) => a.name.localeCompare(b.name),
        },
        render: (value) => <TextField value={value} />,
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        fixed: "left",
        width: 140,
        ellipsis: true,
        hidden: hide?.includes("email"),
        filteredValue: null,
        sorter: {
          compare: (a, b) => a.email.localeCompare(b.email),
        },
        render: (value) => <EmailField value={value} />,
      },
      {
        title: "Data de Criação",
        dataIndex: "created_at",
        key: "created_at",
        width: 150,
        align: "center",
        hidden: hide?.includes("created_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
      },
      {
        title: "Data de Atualização",
        dataIndex: "updated_at",
        key: "updated_at",
        width: 170,
        align: "center",
        hidden: hide?.includes("updated_at"),
        filteredValue: null,
        render: (value) => <DateField value={value} />,
      },
      {
        title: "Nível de Acesso",
        dataIndex: "role",
        key: "role",
        width: 150,
        hidden: hide?.includes("role"),
        filteredValue: roles ? roles : null,
        onFilter: (_, record) =>
          roles?.includes(record.role_id.toString()) || false,
        sorter: {
          compare: (a, b) => a.role.localeCompare(b.role),
        },
        render: (value) => (
          <TagField color={getUniqueColor(value)} value={value} />
        ),
      },
      {
        title: "Equipe",
        dataIndex: "department",
        key: "department",
        width: 150,
        hidden: hide?.includes("department"),
        filteredValue: departments ? departments : null,
        onFilter: (_, record) =>
          departments?.includes(record.department_id.toString()) || false,
        sorter: {
          compare: (a, b) => a.department.localeCompare(b.department),
        },
        render: (value) => (
          <TagField
            color={getUniqueColor(value)}
            value={handleTypeName(value)}
          />
        ),
      },
      {
        title: "Ações",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        width: 100,
        filteredValue: null,
        hidden: !canActions || hide?.includes("actions"),
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="users"
            canDelete={canDelete}
            canEdit={canEdit}
            canShow={canShow}
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, canShow, departments, hide, name, roles]
  );

  return columns;
}
