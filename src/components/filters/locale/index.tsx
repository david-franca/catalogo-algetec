import { Button, Checkbox, Popover, Space } from "antd";
import {
  ArrowUpDown,
  Edit2Icon,
  LanguagesIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";

import { useLocalesColumns } from "@/components/columns/useLocalesColumns";
import { DebounceInput } from "@/components/debounce-input";
import { useLocalesEdit } from "@/hooks/useLocalesEdit";
import { LocaleSearchParams } from "@/schemas";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function LocaleListFilters() {
  const { massEditId } = useLocalesEdit();
  const columns = useLocalesColumns();
  const hideOptions = useMemo(
    () =>
      columns.map((column) => ({
        label: column.title as string,
        value: column.key as string,
      })),
    [columns]
  );

  const { hide, experimentId, language } = useSearch({
    from: "/dashboard/locales/",
  });
  const navigate = useNavigate({ from: "/dashboard/locales" });

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
    key: keyof LocaleSearchParams,
    value?: string | string[]
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value?.length ? value : undefined }),
    });
  };

  const isFiltersApplied = useMemo(
    () => !!experimentId || !!language,
    [experimentId, language]
  );

  const handleClear = () => {
    navigate({
      search: {
        experimentId: undefined,
        language: undefined,
      },
    });
  };

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
          placeholder="Pesquisar por idioma"
          className="w-80"
          value={language}
          onChange={(value) => handleFilterChange("language", value)}
        />
        {isFiltersApplied && (
          <Button icon={<XIcon className="h-4 w-4" />} onClick={handleClear}>
            Limpar
          </Button>
        )}
      </Space>
      <Space>
        {massEditId ? (
          <Button
            type="primary"
            icon={<Edit2Icon className="h-4 w-4" />}
            onClick={() =>
              navigate({
                to: "/dashboard/locales/mass-edit/$id",
                params: { id: massEditId?.toString() },
              })
            }
          >
            Editar em Massa
          </Button>
        ) : null}
        <Button
          type="primary"
          icon={<ArrowUpDown className="h-4 w-4" />}
          onClick={() =>
            navigate({
              to: "/dashboard/translations",
            })
          }
        >
          Exportar/Importar
        </Button>
        <Button
          type="primary"
          icon={<LanguagesIcon className="h-4 w-4" />}
          onClick={() =>
            navigate({
              to: "/dashboard/translations",
            })
          }
        >
          Exportar/Importar
        </Button>
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
      </Space>
    </div>
  );
}
