import { Button, Space, TableColumnsType, Tooltip } from "antd";
import { useMemo } from "react";

import { DateField, TextField } from "@/components/fields";
import { LocaleList } from "@/services/locale.service";
import { handleLanguageName } from "@/utils/handleLanguageName";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function useLocalesColumns(): TableColumnsType<LocaleList> {
  const { hide } = useSearch({ from: "/dashboard/locales/" });
  const navigate = useNavigate();

  const localeColumns = useMemo<TableColumnsType<LocaleList>>(
    () => [
      {
        title: "Experimento",
        dataIndex: "experiment_id",
        key: "experiment_id",
        hidden: hide?.includes("experiment_id"),
      },
      {
        title: "Sigla",
        dataIndex: "language",
        key: "language",
        hidden: hide?.includes("language"),
      },
      {
        title: "Idioma",
        dataIndex: "name",
        key: "name",
        hidden: hide?.includes("name"),
        render: (value) => <TextField value={handleLanguageName(value)} />,
      },
      {
        title: "Versão",
        dataIndex: "version",
        key: "version",
        hidden: hide?.includes("version"),
      },
      {
        title: "Criado em",
        dataIndex: "created_at",
        key: "created_at",
        hidden: hide?.includes("created_at"),
        render: (value) => <DateField value={value} format="DD/MM/YYYY" />,
      },
      {
        title: "Ações",
        key: "actions",
        dataIndex: "actions",
        width: 130,
        fixed: "right",
        align: "center",
        filteredValue: null,
        filterSearch: false,
        render: (_, record) => (
          <Space>
            <Tooltip title="Visualizar">
              <Button
                color="default"
                variant="outlined"
                icon={<EyeOutlined />}
                onClick={() => {
                  navigate({
                    to: "/dashboard/locales/show/$id",
                    params: { id: record.experiment_id },
                    search: {
                      language: record.language,
                      version: record.version,
                    },
                  });
                }}
              />
            </Tooltip>
            <Tooltip title="Editar">
              <Button
                color="primary"
                variant="outlined"
                icon={<EditOutlined />}
                onClick={() => {
                  navigate({
                    to: "/dashboard/locales/edit/$id",
                    params: { id: record.experiment_id },
                    search: {
                      language: record.language,
                      version: record.version,
                    },
                  });
                }}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [hide, navigate]
  );

  return localeColumns;
}
