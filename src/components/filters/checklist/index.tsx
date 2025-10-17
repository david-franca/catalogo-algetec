import { Button, Checkbox, Popover, Space } from "antd";
import { Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useChecklistColumns } from "@/components/columns/useChecklistColumns";
import { DebounceInput } from "@/components/debounce-input";
import { ChecklistSearch } from "@/schemas/checklist.schema";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function ChecklistListFilters() {
  const columns = useChecklistColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const { hide, name } = useSearch({
    from: "/dashboard/checklists/",
  });
  const navigate = useNavigate({ from: "/dashboard/checklists" });
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
    key: keyof ChecklistSearch,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const isFiltersApplied = useMemo(
    () => !!name || !!hide?.length || hideValues.length !== hideOptions.length,
    [hide, hideOptions, hideValues, name]
  );

  const handleClear = useCallback(() => {
    navigate({
      search: {
        name: undefined,
        hide: undefined,
      },
    });
  }, [navigate]);

  return (
    <div className="flex w-full justify-between pb-2">
      <Space wrap>
        <DebounceInput
          search
          placeholder="Pesquisar por nome"
          className="w-80"
          value={name}
          onChange={(value) => handleFilterChange("name", value)}
        />
        {isFiltersApplied && (
          <Button icon={<XIcon className="h-4 w-4" />} onClick={handleClear}>
            Limpar
          </Button>
        )}
      </Space>
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
