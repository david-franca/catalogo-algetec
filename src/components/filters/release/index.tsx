import { Button, Checkbox, Popover, Select } from "antd";
import { Settings2Icon, XIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { useReleaseColumns } from "@/components/columns/useReleaseColumns";
import { DebounceInput } from "@/components/debounce-input";
import { ReleaseSearchParams } from "@/schemas/release.schema";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function ReleaseListFilter() {
  const [pendency, setPendency] = useState<string | null>();
  const columns = useReleaseColumns();
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
    creator,
    experiment,
    id0,
    id10000,
    id5000,
    languages,
    name,
    platformA,
    playStore,
  } = useSearch({ from: "/dashboard/releases/" });
  const navigate = useNavigate({ from: "/dashboard/releases" });

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

  const isFiltersApplied = useMemo(
    () =>
      !!experiment ||
      !!languages ||
      !!creator ||
      !!name ||
      !!platformA ||
      !!playStore ||
      !!id0 ||
      !!id5000 ||
      !!id10000,
    [
      experiment,
      languages,
      creator,
      name,
      platformA,
      playStore,
      id0,
      id5000,
      id10000,
    ]
  );

  const handleFilterChange = (
    key: keyof ReleaseSearchParams,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const handleClear = () => {
    setPendency(null);
    navigate({
      search: {
        name: undefined,
        languages: undefined,
        creator: undefined,
        experiment: undefined,
        platformA: undefined,
        playStore: undefined,
        id0: undefined,
        id5000: undefined,
        id10000: undefined,
      },
    });
  };

  const pendencyOptions = [
    {
      value: "id_0",
      label: "ID +0",
    },
    {
      value: "id_5000",
      label: "ID +5000",
    },
    {
      value: "id_6000",
      label: "ID +10000",
    },
    {
      value: "play_store",
      label: "Play Store",
    },
    {
      value: "languages",
      label: "Linguagens",
    },
    {
      value: "platform_a",
      label: "Plataforma A",
    },
  ];

  const handleSelectPendency = (e: string) => {
    setPendency(e);
    navigate({
      search: {
        id0: e === "id_0" ? "true" : undefined,
        id5000: e === "id_5000" ? "true" : undefined,
        id10000: e === "id_6000" ? "true" : undefined,
        playStore: e === "play_store" ? "true" : undefined,
        languages: e === "languages" ? "true" : undefined,
        platformA: e === "platform_a" ? "true" : undefined,
      },
    });
  };

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
        <DebounceInput
          search
          placeholder="Pesquisar por nome"
          className="w-80"
          value={name}
          onChange={(value) => handleFilterChange("name", value)}
        />
        <DebounceInput
          search
          placeholder="Pesquisar por autor"
          className="w-80"
          value={creator?.[0]}
          onChange={(value) =>
            handleFilterChange("creator", value ? [value] : [])
          }
        />
        <Select
          className="w-80"
          options={pendencyOptions}
          placeholder="Pendências"
          allowClear
          value={pendency}
          onChange={handleSelectPendency}
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
