import {
  Button,
  Col,
  Collapse,
  Descriptions,
  Popconfirm,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { groupBy } from "lodash";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import Highlighter from "react-highlight-words";

import { useDisclosure } from "@/hooks";
import { DemandShow } from "@/types/demand";
import { handleTypeName } from "@/utils";
import { HandleDemand } from "@/utils/handleDemand";
import { handleStringDate } from "@/utils/handleStringDate";
import { useParams } from "@tanstack/react-router";

import { AddLogModalForm } from "../form/add-log";
import { useInactiveLogById } from "@/services/demand.service";
import { toast } from "sonner";

interface HistoryTabProps {
  demand?: DemandShow;
}

export function HistoryTab({ demand }: HistoryTabProps) {
  const [startedAt, setStartedAt] = useState("");
  const [type, setType] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const { id } = useParams({ from: "/dashboard/demands/show/$id" });
  const { mutateAsync, isPending: alterLogIsLoading } = useInactiveLogById();

  const demandShow = useMemo(
    () => (demand ? HandleDemand.toProduction(demand) : undefined),
    [demand]
  );

  const groupDemandLogsByType = useMemo(
    () => groupBy(demandShow?.logs, "type"),
    [demandShow]
  );

  const handleDeadline = (value: number | undefined) => {
    if (!value) return "";
    let hours = Number(value);
    const days = Math.floor(hours / 24);
    hours -= days * 24;
    if (days === 0) {
      return `${hours} horas`;
    }
    return hours > 0 ? `${days} dias e ${hours} horas` : `${days} dias`;
  };

  const onFinish = async (id: number) => {
    mutateAsync({ id, active: false })
      .then(() => {
        toast.success("Log inativado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao inativar log!");
      });
  };

  return (
    <>
      <Collapse
        items={Object.entries(groupDemandLogsByType).map(([key, logs]) => ({
          label: handleTypeName(key),
          key: nanoid(),
          children: (
            <Row>
              <Col lg={20} md={24} sm={24} xs={24}>
                <Typography.Title level={4}>
                  {handleTypeName(key)}
                </Typography.Title>
              </Col>
              <Col lg={4} md={24} sm={24} xs={24}>
                <Button
                  onClick={() => {
                    const lastLog = logs.sort(
                      (a, b) =>
                        dayjs(b.created_at).valueOf() -
                        dayjs(a.created_at).valueOf()
                    )[0];
                    setStartedAt(lastLog.started_at);
                    setType(key);
                    onToggle();
                  }}
                  icon={<PlusIcon className="h-4 w-4" />}
                  type="primary"
                />
              </Col>
              <Col span={24}>
                <Space direction="vertical" className="w-full">
                  {logs
                    .filter((filter) => filter.active)
                    .map((log, index, array) => {
                      const nextIndex = index + 1;
                      const afterLog =
                        nextIndex === array.length ? null : array[nextIndex];

                      return (
                        <Descriptions
                          key={nanoid()}
                          layout={"horizontal"}
                          bordered
                          title={`Data de Atualização: ${dayjs(log.updated_at).format("DD/MM/YYYY HH:mm:ss")}`}
                          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                          extra={
                            array.length > 1 ? (
                              <Tooltip title="Inativar log" placement="bottom">
                                <Popconfirm
                                  title="Inativar log"
                                  description="Tem certeza que quer inativar esse log??"
                                  okText="Sim"
                                  cancelText="Não"
                                  okButtonProps={{
                                    danger: true,
                                    loading: alterLogIsLoading,
                                  }}
                                  onConfirm={() => {
                                    onFinish(log.id);
                                  }}
                                >
                                  <Button danger icon={<Trash2Icon />} />
                                </Popconfirm>
                              </Tooltip>
                            ) : undefined
                          }
                          items={[
                            {
                              label: "Data de Criação",
                              children: handleStringDate(
                                log.created_at,
                                "llll"
                              ),
                            },
                            {
                              label: "Data de Início",
                              children:
                                afterLog &&
                                log.started_at !== afterLog.started_at ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[
                                      handleStringDate(
                                        log.started_at,
                                        "llll"
                                      ) || "",
                                    ]}
                                    autoEscape
                                    textToHighlight={
                                      handleStringDate(
                                        log.started_at,
                                        "llll"
                                      ) || ""
                                    }
                                  />
                                ) : (
                                  handleStringDate(log.started_at, "llll")
                                ),
                            },
                            {
                              label: "Data de Encerramento",
                              children:
                                afterLog &&
                                log.finished_at !== afterLog.finished_at ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[
                                      handleStringDate(
                                        log.finished_at,
                                        "llll"
                                      ) || "",
                                    ]}
                                    autoEscape
                                    textToHighlight={
                                      handleStringDate(
                                        log.finished_at,
                                        "llll"
                                      ) || ""
                                    }
                                  />
                                ) : (
                                  handleStringDate(log.finished_at, "llll")
                                ),
                            },
                            {
                              label: "Prazo",
                              children:
                                afterLog &&
                                log.deadline !== afterLog.deadline ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[handleDeadline(log.deadline)]}
                                    autoEscape
                                    textToHighlight={handleDeadline(
                                      log.deadline
                                    )}
                                  />
                                ) : (
                                  handleDeadline(log.deadline)
                                ),
                            },
                            {
                              label: "Progresso",
                              children:
                                afterLog &&
                                log.progress !== afterLog.progress ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[`${log.progress}%`]}
                                    autoEscape
                                    textToHighlight={`${log.progress}%`}
                                  />
                                ) : (
                                  `${log.progress}%`
                                ),
                            },
                            {
                              label: "Tipo",
                              children:
                                afterLog && log.type !== afterLog.type ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[handleTypeName(log.type)]}
                                    autoEscape
                                    textToHighlight={handleTypeName(log.type)}
                                  />
                                ) : (
                                  handleTypeName(log.type)
                                ),
                            },
                            {
                              label: "Atualizado por",
                              children:
                                afterLog &&
                                log.logger.name !== afterLog.logger.name ? (
                                  <Highlighter
                                    highlightStyle={{
                                      backgroundColor: "#FFC069",
                                      padding: 0,
                                    }}
                                    searchWords={[log.logger.name]}
                                    autoEscape
                                    textToHighlight={log.logger.name}
                                  />
                                ) : (
                                  log.logger.name
                                ),
                            },
                          ]}
                        />
                      );
                    })}
                </Space>
              </Col>
            </Row>
          ),
        }))}
      />

      <AddLogModalForm
        demandId={Number(id)}
        onClose={onToggle}
        open={isOpen}
        lastStartedAt={startedAt}
        type={type}
      />
    </>
  );
}
