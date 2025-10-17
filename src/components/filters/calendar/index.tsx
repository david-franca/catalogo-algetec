import { Select, Space } from "antd";
import { useMemo } from "react";

import { CalendarSearch } from "@/schemas";
import { useDemandTags } from "@/services/demand.service";
import { useUserSelect } from "@/services/user.service";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function CalendarListFilters() {
  const { department, tags, users } = useSearch({
    from: "/dashboard/calendar/",
  });
  const { data: usersOptions, isLoading: usersLoading } = useUserSelect();
  const { data: tagsOptions, isLoading: tagsLoading } = useDemandTags();
  const teamsItems = useMemo(
    () => [
      {
        label: "Roteirização",
        value: "Scripting",
      },
      {
        label: "Modelos",
        value: "Modeling",
      },
      {
        label: "Programação",
        value: "Coding",
      },
      {
        label: "Testes",
        value: "Testing",
      },
      {
        label: "UALAB",
        value: "Ualab",
      },
    ],
    []
  );

  const navigate = useNavigate({ from: "/dashboard/calendar" });

  const handleFilterChange = (
    key: keyof CalendarSearch,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  return (
    <div className="flex w-full justify-between pb-2">
      <Space wrap>
        <Select
          allowClear
          showSearch
          optionFilterProp="label"
          mode="multiple"
          options={usersOptions}
          placeholder="Usuários"
          loading={usersLoading}
          disabled={usersLoading}
          value={users}
          onChange={(value) => handleFilterChange("users", value)}
          maxTagCount="responsive"
          className="w-80"
        />
        <Select
          className="w-80"
          options={tagsOptions}
          placeholder="Tags"
          showSearch
          optionFilterProp="label"
          allowClear
          mode="tags"
          loading={tagsLoading}
          disabled={tagsLoading}
          value={tags}
          onChange={(value) => handleFilterChange("tags", value)}
          maxTagCount="responsive"
        />
        <Select
          className="w-80"
          options={teamsItems}
          placeholder="Equipe"
          allowClear
          showSearch
          optionFilterProp="label"
          value={department}
          onChange={(value) => handleFilterChange("department", value)}
        />
      </Space>
    </div>
  );
}
