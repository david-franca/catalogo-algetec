import { Button, Checkbox, Popover, Radio, Space } from "antd";
import { Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useLabColumns } from "@/components/columns/useLabColumns";
import { DebounceInput } from "@/components/debounce-input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { LabSearchParams } from "@/schemas";
import { handleStatus } from "@/utils/handleStatus";
import { ExperimentStatus } from "@/types/experiment";

export function LabListFilters() {
  const columns = useLabColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const filtersOptions = useMemo(
    () => [
      {
        label: "Sim",
        value: true,
      },
      {
        label: "Não",
        value: false,
      },
      {
        label: "Todos",
        value: undefined,
      },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      {
        label: handleStatus(ExperimentStatus.available),
        value: ExperimentStatus.available,
      },
      {
        label: handleStatus(ExperimentStatus.unavailable),
        value: ExperimentStatus.unavailable,
      },
      {
        label: handleStatus(ExperimentStatus.new),
        value: ExperimentStatus.new,
      },
      {
        label: handleStatus(ExperimentStatus.beta),
        value: ExperimentStatus.beta,
      },
    ],
    []
  );

  const { hide, name, android, approved, en, es, id, ios, pt, status, web } =
    useSearch({
      from: "/dashboard/labs/",
    });
  const navigate = useNavigate({ from: "/dashboard/labs" });

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

  const handleSearchChange = useCallback(
    (key: string, value: boolean | undefined) => {
      navigate({
        search: (prev) => ({
          ...prev,
          [key]: value,
        }),
      });
    },
    [navigate]
  );

  const handleApprovedChange = (value: boolean | undefined) =>
    handleSearchChange("approved", value);
  const handleAndroidChange = (value: boolean | undefined) =>
    handleSearchChange("android", value);
  const handleIosChange = (value: boolean | undefined) =>
    handleSearchChange("ios", value);
  const handleWebChange = (value: boolean | undefined) =>
    handleSearchChange("web", value);
  const handleEnChange = (value: boolean | undefined) =>
    handleSearchChange("en", value);
  const handleEsChange = (value: boolean | undefined) =>
    handleSearchChange("es", value);
  const handlePtChange = (value: boolean | undefined) =>
    handleSearchChange("pt", value);

  const handleStatusChange = useCallback(
    (value: number[] | undefined) => {
      navigate({
        search: (prev) => ({
          ...prev,
          status: value?.length ? value : undefined,
        }),
      });
    },
    [navigate]
  );

  const handleFilterChange = (
    key: keyof LabSearchParams,
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
    () =>
      Object.values({
        name,
        android,
        approved,
        en,
        es,
        id,
        ios,
        pt,
        status,
        web,
      }).some((value) => value !== undefined),
    [name, android, approved, en, es, id, ios, pt, status, web]
  );
  return (
    <div className="flex w-full justify-between pb-2">
      <Space wrap>
        <DebounceInput
          search
          placeholder="Pesquisar por id"
          className="w-80"
          value={id}
          onChange={(value) => handleFilterChange("id", value)}
        />
        <DebounceInput
          search
          placeholder="Pesquisar por nome"
          className="w-80"
          value={name}
          onChange={(value) => handleFilterChange("name", value)}
        />
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={approved}
              onChange={(e) => handleApprovedChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Aprovado</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={pt}
              onChange={(e) => handlePtChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>
            Português
          </Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={en}
              onChange={(e) => handleEnChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Inglês</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={es}
              onChange={(e) => handleEsChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Espanhol</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={web}
              onChange={(e) => handleWebChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Web</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={android}
              onChange={(e) => handleAndroidChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Android</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Radio.Group
              className="flex flex-col space-y-1"
              options={filtersOptions}
              value={ios}
              onChange={(e) => handleIosChange(e.target.value)}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Ios</Button>
        </Popover>
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Checkbox.Group
              className="flex flex-col space-y-1"
              options={statusOptions}
              value={status}
              onChange={handleStatusChange}
            />
          }
        >
          <Button icon={<Settings2Icon className="h-4 w-4" />}>Status</Button>
        </Popover>
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
