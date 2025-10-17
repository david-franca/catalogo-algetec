import { List, Popover, TableColumnsType } from "antd";
import { nanoid } from "nanoid";
import { useMemo } from "react";

import { ObjectsList } from "@/types/objects";
import { ObjectCompetence } from "@/types/skills";
import { FileOutlined, FileTextOutlined } from "@ant-design/icons";

import { TextField } from "../fields";

export function useObjectsColumns() {
  const columns = useMemo<TableColumnsType<ObjectsList>>(
    () => [
      {
        title: "Objeto de Conhecimento",
        dataIndex: "objects",
        key: "objects",
        showSorterTooltip: false,
        width: 150,
        render: (value: ObjectCompetence) => (
          <TextField value={value.name} ellipsis />
        ),
      },
      {
        title: "Currículo",
        dataIndex: "competenceCurriculumName",
        key: "competenceCurriculumName",
        showSorterTooltip: false,
        align: "center",
        width: 150,
        sorter: true,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Área da Competência",
        dataIndex: "competenceAreaName",
        key: "competenceAreaName",
        showSorterTooltip: false,
        align: "center",
        width: 150,
        render: (value) => <TextField value={value} ellipsis />,
      },
      {
        title: "Cód Competência",
        dataIndex: "competenceCode",
        key: "competenceCode",
        showSorterTooltip: false,
        align: "center",
        width: 180,
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Desc Competência",
        dataIndex: "competenceDescription",
        key: "competenceDescription",
        align: "center",
        width: 150,
        render: (value) =>
          value ? (
            <Popover
              content={
                <div className="w-96 h-full max-h-96 overflow-y-scroll">
                  {value}
                </div>
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Cód Hab",
        dataIndex: "code",
        key: "code",
        showSorterTooltip: false,
        width: 120,
        align: "center",
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Desc Hab",
        dataIndex: "description",
        key: "description",
        align: "center",
        width: 110,
        render: (value) =>
          value ? (
            <Popover
              content={
                <div className="w-96 h-full max-h-96 overflow-y-scroll">
                  {value}
                </div>
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Unidade Temática",
        dataIndex: "unites",
        key: "unites",
        showSorterTooltip: false,
        align: "center",
        width: 100,
        render: (values: string[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item}</List.Item>
                  )}
                />
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Notas",
        dataIndex: "notes",
        key: "notes",
        align: "center",
        width: 80,
        render: (value) =>
          value ? (
            <Popover
              content={
                <div className="w-96 h-full max-h-96 overflow-y-scroll">
                  {value}
                </div>
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Práticas da Habilidade",
        dataIndex: "practices",
        key: "practices",
        showSorterTooltip: false,
        align: "center",
        width: 100,
        render: (values: string[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item}</List.Item>
                  )}
                />
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: "Práticas do Objeto",
        dataIndex: "objectPractices",
        key: "objectPractices",
        showSorterTooltip: false,
        align: "center",
        width: 100,
        render: (values: string[]) =>
          values.length ? (
            <Popover
              content={
                <List
                  dataSource={values}
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>{item}</List.Item>
                  )}
                />
              }
            >
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
    ],
    []
  );

  return columns;
}
