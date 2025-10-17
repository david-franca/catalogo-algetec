import { useIssuesColumns } from "@/components/columns/useIssueColumns";
import { DebounceInput } from "@/components/debounce-input";
import { IssueSearchSchema } from "@/schemas";
import { SelectOptions } from "@/types/select";
import { PRIORITY } from "@/utils/handlePriority";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button, Checkbox, Popover } from "antd";
import { FilterIcon, PlusCircleIcon, Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { FilterForm } from "./filter-form";
import { useDisclosure } from "@/hooks";

export function IssueListFilters() {
  const { onToggle, isOpen } = useDisclosure();
  const columns = useIssuesColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );
  const {
    hide,
    approved,
    creator,
    experiment,
    priority,
    problem,
    responsible,
    status,
  } = useSearch({ from: "/dashboard/issues/" });
  const navigate = useNavigate({ from: "/dashboard/issues" });

  const priorityOptions: SelectOptions[] = [
    { label: "Baixa", value: PRIORITY.LOW.toString() },
    { label: "Normal", value: PRIORITY.NORMAL.toString() },
    { label: "Alto", value: PRIORITY.HIGH.toString() },
    { label: "Crítica", value: PRIORITY.CRITICAL.toString() },
  ];

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
    key: keyof IssueSearchSchema,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleClear = () => {
    navigate({
      search: {
        approved: undefined,
        priority: undefined,
        status: undefined,
        creator: undefined,
        experiment: undefined,
        hide: undefined,
        problem: undefined,
        responsible: undefined,
      },
    });
  };

  const isFiltersApplied = useMemo(
    () =>
      approved ||
      priority ||
      status ||
      creator ||
      experiment ||
      problem ||
      responsible,
    [approved, priority, status, creator, experiment, problem, responsible]
  );

  return (
    <div className="flex w-full justify-between pb-2">
      <div className="flex space-x-2">
        <DebounceInput
          search
          placeholder="Pesquisar por id do experimento"
          className="w-80"
          value={experiment}
          onChange={(value) => handleFilterChange("experiment", value)}
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          title="Prioridade"
          content={
            <Checkbox.Group
              className="flex flex-col space-y-1"
              options={priorityOptions}
              onChange={(value: string[]) =>
                handleFilterChange("priority", value)
              }
              value={priority}
            />
          }
        >
          <Button icon={<PlusCircleIcon className="h-4 w-4" />}>
            Gravidade
          </Button>
        </Popover>
        <Button icon={<FilterIcon className="h-4 w-4" />} onClick={onToggle}>
          Mais filtros
        </Button>
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
      <FilterForm isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
}
