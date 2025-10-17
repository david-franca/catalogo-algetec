import { Card, Popover, Space, TableColumnsType, Typography } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useCan } from "@/hooks";
import { useReleaseDelete } from "@/services/release.service";
import { ReleaseDataType } from "@/types/release";
import { completeVersion } from "@/utils/completeVersion";
import { handleTypes } from "@/utils/handleTypes";
import {
  FileOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useSearch } from "@tanstack/react-router";

import { Actions } from "../actions";
import {
  BooleanField,
  DateField,
  TagField,
  TextField,
  UrlField,
} from "../fields";
import { ScrollArea } from "../scrool-area";

export function useReleaseColumns() {
  const { hide } = useSearch({ from: "/dashboard/releases/" });

  // Permissions
  const can = useCan();
  const canEdit = can("update", "Release");
  const canDelete = can("delete", "Release");
  const canActions = canEdit || canDelete;

  const { mutateAsync: deleteRelease, isPending } = useReleaseDelete();

  const onDelete = useCallback(
    (id: number) => {
      deleteRelease(id)
        .then(() => toast.success("Versão deletada com sucesso"))
        .catch(() => toast.error("Erro ao deletar versão"));
    },
    [deleteRelease]
  );

  const columns = useMemo<TableColumnsType<ReleaseDataType>>(
    () => [
      {
        title: "ID",
        dataIndex: "experiment_id",
        key: "experiment_id",
        hidden: hide?.includes("experiment_id"),
        width: 100,
        sorter: true,
        showSorterTooltip: false,
        render: (value: number) => (
          <UrlField
            value={value.toString()}
            href={`/dashboard/labs/show/${value}`}
            target="_blank"
          />
        ),
      },
      {
        title: "Nome",
        onFilter: undefined,
        dataIndex: "name",
        key: "name",
        hidden: hide?.includes("name"),
        ellipsis: true,
        width: 150,
        sorter: true,
        render: (value) => <TextField value={value} />,
        showSorterTooltip: false,
      },
      {
        title: "Tipo",
        dataIndex: "type",
        key: "type",
        hidden: hide?.includes("type"),
        width: 190,
        filteredValue: undefined,
        render: (types: ReleaseDataType["type"]) => (
          <Space direction="vertical">
            {types.map((type) => (
              <TagField key={nanoid()} value={type.name} color={type.color} />
            ))}
          </Space>
        ),
      },
      {
        title: "Versão",
        dataIndex: "version",
        key: "version",
        hidden: hide?.includes("version"),
        width: 100,
        sorter: true,
        render: (value) => <TextField value={completeVersion(value)} />,
      },
      {
        title: "Data",
        dataIndex: "created_at",
        key: "created_at",
        hidden: hide?.includes("created_at"),
        width: 100,
        render: (value) => <DateField value={value} />,
        sorter: true,
        filteredValue: undefined,
      },
      {
        title: "Autor",
        dataIndex: "author",
        key: "author",
        hidden: hide?.includes("author"),
        onFilter: undefined,
        width: 100,
        ellipsis: true,
        sorter: true,
        render: (value) => <TextField value={value} />,
      },
      {
        title: "Descrição",
        dataIndex: "description",
        key: "description",
        hidden: hide?.includes("description"),
        align: "center",
        width: 100,
        render: (value) =>
          value ? (
            <Popover content={<ScrollArea>{value}</ScrollArea>}>
              <FileTextOutlined />
            </Popover>
          ) : (
            <FileOutlined />
          ),
      },
      {
        title: (
          <Space>
            ID +0
            <Popover
              content={
                <Card
                  title="Acesso dos laboratórios em português"
                  style={{ width: 400 }}
                >
                  Exibe somente itens do tipo trilha português, build Android e
                  build WebGL cuja versão mais recente destes tipos não está
                  VERDADEIRO no campo ID +0. Isso significa que ao usar esse
                  filtro, será mostrado em quais IDs as builds webGL estão
                  desatualizadas ou está faltando atualizar a página para abrir
                  a versão Android no celular ou a trilha está desatualizada
                  (houve mudança do roteiro, sumário, testes, etc) nos IDs com
                  UALABS em português.
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "id_0",
        key: "id_0",
        hidden: hide?.includes("id_0"),
        align: "center",
        width: 100,
        render: (value, record) =>
          handleTypes(record.type, value, "id_0") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: (
          <Space>
            ID +5000
            <Popover
              content={
                <Card
                  title="Acesso dos laboratórios em espanhol"
                  style={{ width: 400 }}
                >
                  <Typography.Text>
                    Exibe somente itens do tipo trilha espanhol, build Android e
                    build WebGL cuja versão mais recente destes tipos{" "}
                    <Typography.Text strong>
                      não está VERDADEIRO
                    </Typography.Text>{" "}
                    no campo ID +5000. Isso significa que ao usar esse filtro,
                    será mostrado em quais IDs as builds webGL estão
                    desatualizadas ou está faltando atualizar a página para
                    abrir a versão Android no celular ou a trilha está
                    desatualizada (houve mudança do roteiro, sumário, testes,
                    etc) nos IDs com UALABS em espanhol.
                  </Typography.Text>
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "id_5000",
        key: "id_5000",
        hidden: hide?.includes("id_5000"),
        align: "center",
        width: 120,
        render: (value, record) =>
          handleTypes(record.type, value, "id_5000") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: (
          <Space>
            ID +10000
            <Popover
              content={
                <Card
                  title="Acesso dos laboratórios em inglês"
                  style={{ width: 400 }}
                >
                  Exibe somente itens do tipo trilha inglês, build Android e
                  build WebGL cuja versão mais recente destes tipos não está
                  VERDADEIRO no campo ID +10000. Isso significa que ao usar esse
                  filtro, será mostrado em quais IDs as builds webGL estão
                  desatualizadas ou está faltando atualizar a página para abrir
                  a versão Android no celular ou a trilha está desatualizada
                  (houve mudança do roteiro, sumário, testes, etc) nos IDs com
                  UALABS em inglês.
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "id_6000",
        key: "id_6000",
        hidden: hide?.includes("id_6000"),
        align: "center",
        width: 120,
        render: (value, record) =>
          handleTypes(record.type, value, "id_6000") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: (
          <Space>
            Play Store
            <Popover
              content={
                <Card title="Versão para Android" style={{ width: 400 }}>
                  Exibe somente itens do tipo build Android cuja versão mais
                  recente deste tipo não está VERDADEIRO no campo Play Store.
                  Isso significa que ao usar esse filtro, será mostrado em quais
                  IDs as builds Android estão desatualizadas na Play Store.
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "play_store",
        key: "play_store",
        hidden: hide?.includes("play_store"),
        align: "center",
        width: 120,
        render: (value, record) =>
          handleTypes(record.type, value, "play_store") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: (
          <Space>
            Linguagens
            <Popover
              content={
                <Card title="Arquivos de tradução" style={{ width: 400 }}>
                  Exibe somente itens do tipo revisão de conteúdo inglês,
                  revisão de conteúdo espanhol, planilha de tradução, CSV
                  português. CSV inglês, CSV espanhol. Isso significa que ao
                  usar esse filtro, será mostrado quais IDs estão com alguma
                  pendência para nesses itens (revisão pendente, planilha não
                  traduzida, CSVs não colocados online).
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "languages",
        key: "languages",
        hidden: hide?.includes("languages"),
        align: "center",
        width: 120,
        render: (value, record) =>
          handleTypes(record.type, value, "languages") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: (
          <Space>
            Plataforma A
            <Popover
              content={
                <Card title="Acesso via Sagah 2.0" style={{ width: 400 }}>
                  Exibe somente itens do tipo build Android e build WebGL cuja
                  versão mais recente destes tipos não está VERDADEIRO na versão
                  2.0 na Plataforma A. Isso significa que ao usar esse filtro,
                  será mostrado em quais IDs as builds WebGL estão
                  desatualizadas ou está faltando atualizar a página para abrir
                  a versão Android no celular.
                </Card>
              }
            >
              <InfoCircleOutlined style={{ cursor: "pointer" }} />
            </Popover>
          </Space>
        ),
        dataIndex: "platform_a",
        key: "platform_a",
        hidden: hide?.includes("platform_a"),
        align: "center",
        width: 140,
        render: (value, record) =>
          handleTypes(record.type, value, "platform_a") ? (
            <BooleanField value={value} />
          ) : (
            "—"
          ),
      },
      {
        title: "Ações",
        key: "actions",
        width: 100,
        fixed: "right",
        hidden: !canActions || hide?.includes("actions"),
        align: "center",
        dataIndex: "actions",
        render: (_, record) => (
          <Actions
            id={record.id.toString()}
            resource="releases"
            loading={isPending}
            canDelete={canDelete}
            canEdit={canEdit}
            onDelete={() => onDelete(record.id)}
            isNewPage
          />
        ),
      },
    ],
    [canActions, canDelete, canEdit, hide, isPending, onDelete]
  );

  return columns;
}
