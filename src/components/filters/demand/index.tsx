import { Button, Checkbox, DatePicker, Popover, Space } from "antd";
import dayjs from "dayjs";
import { FilterIcon, Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useDemandColumns } from "@/components/columns";
import { DebounceInput } from "@/components/debounce-input";
import { useDisclosure } from "@/hooks";
import { DemandSearchParams } from "@/schemas";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { FilterForm } from "./filter-form";

export function DemandListFilters() {
  const { onToggle, isOpen } = useDisclosure();
  const columns = useDemandColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const { experimentId, experiment, finishedAtEnd, finishedAtStart, hide } =
    useSearch({
      from: "/dashboard/demands/",
    });
  const navigate = useNavigate({ from: "/dashboard/demands" });

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
    key: keyof DemandSearchParams,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleDatesChange = useCallback(
    (dates: [string | null, string | null]) => {
      const [start, end] = dates;

      navigate({
        search: (prev) => ({
          ...prev,
          finishedAtStart: start?.length ? start : undefined,
          finishedAtEnd: end?.length ? end : undefined,
        }),
      });
    },
    [navigate]
  );

  const handleClear = () => {
    navigate({
      search: {
        experimentId: undefined,
        experiment: undefined,
        finishedAtStart: undefined,
        finishedAtEnd: undefined,
      },
    });
  };

  const isFiltersApplied = useMemo(
    () =>
      Boolean(experimentId || experiment || finishedAtStart || finishedAtEnd),
    [experimentId, experiment, finishedAtStart, finishedAtEnd]
  );

  return (
    <div className="flex w-full justify-between pb-2">
      <Space wrap>
        <DebounceInput
          search
          placeholder="Pesquisar por id do experimento"
          className="w-80"
          value={experimentId}
          onChange={(value) => handleFilterChange("experimentId", value)}
        />
        <DebounceInput
          search
          placeholder="Pesquisar por experimento"
          className="w-80"
          value={experiment}
          onChange={(value) => handleFilterChange("experiment", value)}
        />
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          placeholder={["Prazo Inicial", "Prazo Final"]}
          onChange={(_, value) => handleDatesChange(value)}
          value={[
            finishedAtStart ? dayjs(finishedAtStart, "DD/MM/YYYY") : undefined,
            finishedAtEnd ? dayjs(finishedAtEnd, "DD/MM/YYYY") : undefined,
          ]}
        />
        <Button icon={<FilterIcon className="h-4 w-4" />} onClick={onToggle}>
          Mais filtros
        </Button>
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
      <FilterForm isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
}
