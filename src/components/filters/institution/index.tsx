import { Button, Checkbox, Popover } from "antd";
import { Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useInstitutionColumns } from "@/components/columns";
import { DebounceInput } from "@/components/debounce-input";
import { InstitutionSearchParams } from "@/schemas";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function InstitutionListFilters() {
  const columns = useInstitutionColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const { hide, name } = useSearch({
    from: "/dashboard/institutions/",
  });
  const navigate = useNavigate({ from: "/dashboard/institutions" });

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
    key: keyof InstitutionSearchParams,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleClear = () => {
    navigate({
      search: {
        name: undefined,
        hide: undefined,
      },
    });
  };

  const isFiltersApplied = useMemo(
    () => Boolean(name) || Boolean(hide?.length),
    [name, hide]
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
