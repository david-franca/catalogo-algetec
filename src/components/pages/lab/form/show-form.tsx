import {
  Badge,
  Button,
  Card,
  CardProps,
  Col,
  Divider,
  Empty,
  List,
  Row,
  Space,
  Statistic,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { forEach, groupBy, orderBy } from "lodash";
import { nanoid } from "nanoid";
import { PropsWithChildren } from "react";

import placeholderImage from "@/assets/img/placeholder-image.jpg";
import {
  BooleanField,
  ImageField,
  TagField,
  TextField,
  UrlField,
} from "@/components/fields";
import { useBreakpoint, useDisclosure } from "@/hooks";
import { useExperimentShow } from "@/services/experiment.service";
import { DemandStatus } from "@/types/demand";
import {
  ExperimentRelease,
  ExperimentReleaseResponse,
  ExperimentShowResponse,
} from "@/types/experiment";
import { ReleaseType } from "@/types/release";
import { completeVersion } from "@/utils/completeVersion";
import { handleExtension } from "@/utils/handleExtesion";
import { handleLinkName } from "@/utils/handleLinkName";
import {
  BuildOutlined,
  DislikeOutlined,
  IssuesCloseOutlined,
  LikeOutlined,
  LinkOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { ReactNode, useNavigate, useSearch } from "@tanstack/react-router";

import { IssueChart } from "../charts";
import { DemandsTable } from "../table/demands.table";
import { DocumentTable } from "../table/documents.table";
import { IssuesTable } from "../table/issues.table";
import { ReleaseTable } from "../table/versions.table";

interface LabShowFormProps {
  id: string;
}

interface IFilesProps {
  id: number;
  name: string;
  link: string;
  created_at: string;
  user: string;
  hasDemand: boolean;
}

interface IListItemProps extends PropsWithChildren {
  hasDemand: boolean;
}

const { Paragraph, Title } = Typography;

function ListItem({ hasDemand, children }: IListItemProps) {
  if (!hasDemand) {
    return <Badge.Ribbon text="Sem Entrega">{children}</Badge.Ribbon>;
  }
  return <div>{children}</div>;
}

export default function LabShowForm({ id }: LabShowFormProps) {
  const { data: labData, isLoading, isFetching } = useExperimentShow(id);
  const addDoc = useDisclosure();
  const { isAboveLg } = useBreakpoint("lg");
  const items: CardProps["tabList"] = [
    {
      key: "details",
      label: "Detalhes",
    },
    {
      key: "issues",
      label: "Problemas",
    },
    {
      key: "demands",
      label: "Entregas",
    },
    {
      key: "versions",
      label: "Lançamentos",
    },
    {
      key: "changelog",
      label: "Alterações",
    },
    {
      key: "files",
      label: "Arquivos",
    },
    {
      key: "documents",
      label: "Documentos do Editor",
    },
  ];
  const { tab } = useSearch({ from: "/dashboard/labs/show/$id" });
  const navigate = useNavigate({ from: "/dashboard/labs/show/$id" });

  const colors = {
    tomato: "#e54d2e",
    green: "#30a46c",
    cyan: "#00a2c7",
    purple: "#8e4ec6",
  };

  const handleApproved = ({ demands, issues }: ExperimentShowResponse) => {
    let isApproved = true;

    if (demands.length === 0 && issues.length === 0) {
      isApproved = false;
    }
    const demandsBoolean = demands.map(
      (demand) => demand.status === DemandStatus.READY
    );
    const approvedIssues = issues.map((issue) => issue.approved);

    if (demandsBoolean.includes(false) || approvedIssues.includes(false)) {
      isApproved = false;
    }

    return (
      <BooleanField
        title={isApproved ? "Aprovado" : "Reprovado"}
        value={isApproved}
        trueIcon={<LikeOutlined className="text-emerald-700 text-xl" />}
        falseIcon={<DislikeOutlined className="text-red-700 text-xl" />}
      />
    );
  };

  const handleExistADemandUnresolved = ({
    demands,
  }: ExperimentShowResponse) => {
    const demandsBoolean = demands.filter(
      (demand) => demand.status !== DemandStatus.READY
    );
    if (demandsBoolean.length !== 0) {
      return (
        <li>
          <p style={{ color: colors.tomato }}>
            Existem entregas que ainda não estão prontas.
          </p>
        </li>
      );
    }
    return "";
  };

  const handleExistAIssueRejected = ({ issues }: ExperimentShowResponse) => {
    const approvedIssues = issues.filter((issue) => !issue.approved);
    if (approvedIssues.length !== 0) {
      return (
        <li>
          <p style={{ color: colors.tomato }}>
            Existem problemas não aprovados.
          </p>
        </li>
      );
    }
    return "";
  };

  const handleVerifyPendencies = ({ releases }: ExperimentShowResponse) => {
    if (releases.length === 0) {
      return "";
    }

    const pendingReleases = releases.filter(
      (release) =>
        !release.id_0 &&
        !release.id_5000 &&
        !release.id_6000 &&
        !release.languages &&
        !release.platform_a &&
        !release.play_store
    );

    if (pendingReleases.length) {
      return (
        <li>
          <p style={{ color: colors.tomato }}>
            Existem pendências não aprovadas.
          </p>
        </li>
      );
    }

    return "";
  };

  const handleRelease = (data: ExperimentReleaseResponse[]) => {
    const newReleases: ExperimentRelease[] = [];

    forEach(groupBy(data, "id"), (data) => {
      const releaseType: ReleaseType[] = [];
      data.forEach((el) => releaseType.push(el.releaseType));
      newReleases.push({ ...data[0], releaseType });
    });
    return newReleases;
  };

  const handleFiles = ({
    demands,
    files,
  }: ExperimentShowResponse): IFilesProps[] => {
    const newFiles: IFilesProps[] = [];

    demands.forEach((demand) =>
      demand.files.forEach((file) =>
        newFiles.push({
          created_at: file.created_at,
          hasDemand: true,
          id: file.id,
          link: file.link,
          name: file.name,
          user: file.user.name,
        })
      )
    );

    files.forEach((file) =>
      newFiles.push({
        created_at: file.created_at,
        hasDemand: false,
        id: file.id,
        link: file.link,
        name: file.name,
        user: file.user.name,
      })
    );

    return newFiles;
  };

  const contentList: Record<string, ReactNode> = {
    details: labData ? (
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Card
            bordered={false}
            className="mb-4 px-4 pt-4"
            actions={[
              <UrlField
                target="_blank"
                className="text-xl"
                value={`https://catalogoalgetec.grupoa.education/details/${labData.id}`}
              >
                {isAboveLg ? (
                  <>
                    Catálogo <LinkOutlined className="text-cyan-700" />
                  </>
                ) : (
                  <Tooltip title="Catálogo">
                    <LinkOutlined className="text-cyan-700" />
                  </Tooltip>
                )}
              </UrlField>,
              isAboveLg ? (
                <>
                  <Typography.Text className="pr-2 text-gray-400 text-xl">
                    Aprovado:
                  </Typography.Text>
                  {handleApproved(labData)}
                </>
              ) : (
                handleApproved(labData)
              ),
            ]}
            cover={
              labData.image ? (
                <ImageField
                  value={labData.image}
                  imageTitle={labData.name}
                  width="100%"
                />
              ) : (
                <ImageField
                  value={placeholderImage}
                  preview={false}
                  imageTitle="Sem Imagem"
                  width="100%"
                />
              )
            }
          />
          <Row gutter={[16, 16]}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Card bordered={false} className="text-left">
                <Paragraph
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "bolder",
                    padding: "0 1rem",
                  }}
                >
                  Motivos de reprovação:
                </Paragraph>
                <ul
                  style={{
                    fontWeight: "bolder",
                    listStyle: "none",
                    padding: "0 2rem",
                  }}
                >
                  {handleExistADemandUnresolved(labData)}
                  {labData.onlyExistACardinLastColumn === false ? (
                    <li>
                      <p className="text-red-700">
                        Uma das demandas está presente em algum kanban e o
                        status dela é diferente de &quot;Pronto&quot;.
                      </p>
                    </li>
                  ) : (
                    ""
                  )}

                  {handleExistAIssueRejected(labData)}
                  {handleVerifyPendencies(labData)}
                </ul>
              </Card>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Versão em Inglês"
                  value={labData.en_version}
                  valueStyle={{ color: colors.green }}
                />
              </Card>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Versão em Espanhol"
                  value={labData.es_version}
                  valueStyle={{ color: colors.green }}
                />
              </Card>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Versão Android"
                  value={completeVersion(
                    labData.latest_android_release?.version || ""
                  )}
                  valueStyle={{ color: colors.green }}
                />
              </Card>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Versão WebGL"
                  value={completeVersion(
                    labData.latest_webgl_release?.version || ""
                  )}
                  valueStyle={{ color: colors.green }}
                />
              </Card>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Problemas"
                  value={labData.issues.length}
                  valueStyle={{ color: colors.tomato }}
                  prefix={<IssuesCloseOutlined />}
                />
              </Card>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Entregas"
                  value={labData.demands.length}
                  valueStyle={{ color: colors.cyan }}
                  prefix={<RocketOutlined />}
                />
              </Card>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Card bordered={false} className="text-center">
                <Statistic
                  title="Lançamentos"
                  value={labData.releases.length}
                  valueStyle={{ color: colors.purple }}
                  prefix={<BuildOutlined />}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <Space align="center" direction="vertical" className="w-full">
                  <Title level={5}>Problemas por Gravidade</Title>
                </Space>
                {labData.issues?.length ? (
                  <div className="lg:px-16">
                    <IssueChart issues={labData.issues} />
                  </div>
                ) : (
                  <Empty description="Sem problemas" />
                )}
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={12} md={24} sm={24} xs={24}>
          <Card bordered={false}>
            {labData.description ? (
              <Paragraph>{parse(labData.description)}</Paragraph>
            ) : null}
          </Card>
        </Col>
      </Row>
    ) : null,
    issues: labData?.issues ? (
      <IssuesTable
        dataSource={labData.issues}
        loading={isLoading || isFetching}
      />
    ) : null,
    demands: labData?.demands ? (
      <DemandsTable
        dataSource={labData.demands}
        loading={isLoading || isFetching}
      />
    ) : null,
    versions: labData?.releases ? (
      <ReleaseTable
        dataSource={labData.releases}
        loading={isLoading || isFetching}
      />
    ) : null,
    changelog: labData?.releases.length ? (
      <Timeline
        mode="alternate"
        items={orderBy(
          handleRelease(labData.releases),
          "created_at",
          "desc"
        ).map((release) => ({
          label: (
            <Title level={5}>{dayjs(release.created_at).calendar()}</Title>
          ),
          children: (
            <Card key={nanoid()} title={completeVersion(release.version)}>
              <Space>
                {release.releaseType.map((type) => (
                  <TagField
                    key={nanoid()}
                    value={type.name}
                    color={type.color}
                  />
                ))}
              </Space>

              {release.description ? <Divider /> : null}
              <Paragraph
                className="text-justify"
                ellipsis={{
                  rows: 2,
                  expandable: true,
                  symbol: "mais",
                }}
              >
                {release.description}
              </Paragraph>
              <Divider />
              <TextField
                className="text-gray-400 italic"
                value={`"${release.author.name}"`}
              />
            </Card>
          ),
        }))}
      />
    ) : (
      <Empty />
    ),
    files: (
      <Space direction="vertical" className="w-full">
        <Button block type="dashed" onClick={addDoc.onOpen}>
          Adicionar arquivo
        </Button>
        {labData?.demands.length || labData?.files.length ? (
          <List
            grid={{ gutter: 16, column: 2, lg: 2, md: 1 }}
            dataSource={handleFiles(labData)}
            renderItem={(item) => (
              <ListItem key={nanoid()} hasDemand={item.hasDemand}>
                <Card>
                  <Row>
                    <Col span={18}>
                      <List.Item.Meta
                        title={`Enviado por ${item.user}`}
                        description={dayjs(item.created_at).calendar()}
                      />
                      <UrlField target="_blank" value={item.link}>
                        {handleLinkName(item.name)}
                      </UrlField>
                    </Col>
                    <Col span={6}>
                      <Button
                        block
                        className="h-full"
                        icon={handleExtension(item.name)}
                      />
                    </Col>
                  </Row>
                </Card>
              </ListItem>
            )}
          />
        ) : (
          <Empty />
        )}
      </Space>
    ),
    documents:
      labData && labData?.templates !== null ? (
        <DocumentTable
          dataSource={labData.templates}
          loading={isLoading || isFetching}
        />
      ) : (
        <Empty />
      ),
  };
  return (
    <Card
      tabList={items}
      loading={isLoading}
      className="w-full h-fit"
      title={`${labData?.id} - ${labData?.name}`}
      activeTabKey={tab}
      onTabChange={(key) => {
        navigate({
          search: {
            tab: key,
          },
        });
      }}
    >
      {contentList[tab]}
    </Card>
  );
}
