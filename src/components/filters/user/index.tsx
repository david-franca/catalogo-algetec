import { Button, Checkbox, Popover } from "antd";
import { PlusCircleIcon, Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useUserColumns } from "@/components/columns";
import { DebounceInput } from "@/components/debounce-input";
import { UserSearchParams } from "@/schemas";
import { useDepartmentSelect } from "@/services/department.service";
import { useRoleSelect } from "@/services/role.service";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function UserListFilters() {
  const columns = useUserColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );
  const { data: rolesOptions, isLoading: rolesLoading } = useRoleSelect();
  const { data: departmentOptions, isLoading: departmentLoading } =
    useDepartmentSelect();

  const { hide, name, departments, roles } = useSearch({
    from: "/dashboard/users/",
  });
  const navigate = useNavigate({ from: "/dashboard/users" });

  const hideValues = useMemo(
    () =>
      hideOptions
        .map((option) => option.value?.toString())
        .filter((option) => !hide?.includes(option)),
    [hide, hideOptions]
  );

  const handleHideChange = useCallback(
    (value: (string | undefined)[]) => {
      const valueDifference = hideOptions
        .filter((option) => !value.includes(option.value?.toString()))
        .map((option) => option.value?.toString());

      navigate({
        search: (prev) => ({
          ...prev,
          hide: valueDifference.length ? valueDifference : undefined,
        }),
      });
    },
    [hideOptions, navigate]
  );

  const handleFilterChange = (
    key: keyof UserSearchParams,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleClear = () => {
    return navigate({
      search: {
        name: undefined,
        roles: undefined,
        departments: undefined,
        hide: undefined,
      },
    });
  };

  const isFiltersApplied = useMemo(
    () =>
      Boolean(name) ||
      Boolean(roles?.length) ||
      Boolean(departments?.length) ||
      Boolean(hide?.length),
    [name, roles, departments, hide]
  );

  return (
    <div className="flex w-full justify-between pb-2">
      <div className="flex space-x-2">
        <DebounceInput
          search
          placeholder="Pesquisar por nome"
          className="w-80"
          value={name}
          onChange={(value) => handleFilterChange("name", value)}
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          title="Nível de Acesso"
          content={
            <Checkbox.Group
              className="flex flex-col space-y-1"
              options={rolesOptions}
              onChange={(value: string[]) => handleFilterChange("roles", value)}
              value={roles}
            />
          }
        >
          <Button
            icon={<PlusCircleIcon className="h-4 w-4" />}
            disabled={rolesLoading}
          >
            Nível de Acesso
          </Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          title="Equipe"
          content={
            <Checkbox.Group
              className="flex flex-col space-y-1"
              options={departmentOptions}
              onChange={(value) => handleFilterChange("departments", value)}
              value={departments}
            />
          }
        >
          <Button
            icon={<PlusCircleIcon className="h-4 w-4" />}
            disabled={departmentLoading}
          >
            Equipe
          </Button>
        </Popover>
        {isFiltersApplied && (
          <Button icon={<XIcon className="h-4 w-4" />} onClick={handleClear}>
            Limpar
          </Button>
        )}
      </div>
      <Popover
        trigger={"click"}
        placement="bottomRight"
        title="Colunas"
        content={
          <Checkbox.Group
            className="flex flex-col space-y-1"
            options={hideOptions}
            value={hideValues}
            onChange={handleHideChange}
          />
        }
      >
        <Button icon={<Settings2Icon className="h-4 w-4" />}>Colunas</Button>
      </Popover>
    </div>
  );
}
