import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Space,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { toast } from "sonner";

import { DateField, TagField } from "@/components/fields";
import { useIssueCommentCreate, useIssueShow } from "@/services/issue.service";
import { useUserList } from "@/services/user.service";
import { getUniqueColor } from "@/utils";
import { completeVersion } from "@/utils/completeVersion";
import { handleLinkName } from "@/utils/handleLinkName";
import { PRIORITY } from "@/utils/handlePriority";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
} from "@ant-design/icons";

interface IssueShowFormProps {
  id: string;
}

interface FormProps {
  comment: string;
}

export default function IssueShowForm({ id }: IssueShowFormProps) {
  const { data: issueData, isLoading: isIssuesLoading } = useIssueShow(id);
  const { data: usersData, isLoading: isUsersLoading } = useUserList();

  const { mutateAsync: createComment, isPending: isCreating } =
    useIssueCommentCreate(id);

  const handlePriority = (priority?: number) => {
    switch (priority) {
      case PRIORITY.LOW:
        return <Tag color="#62C450">Baixa</Tag>;
      case PRIORITY.NORMAL:
        return <Tag color="#FFD827">Normal</Tag>;
      case PRIORITY.HIGH:
        return <Tag color="#F78D37">Alta</Tag>;
      case PRIORITY.CRITICAL:
        return <Tag color="#D42A34">Crítica</Tag>;

      default:
        return "-";
    }
  };

  const handleUser = (userId: number | null) =>
    usersData?.find((user) => user.id === userId)?.name;

  const handleExtension = (name: string, link?: string) => {
    const ext = name.split(".").pop();
    let icon = <FileUnknownOutlined className="text-3xl text-gray-600" />;
    if (ext === "txt") {
      icon = <FileTextOutlined className="text-3xl" />;
    }
    if (ext === "pdf") {
      icon = <FilePdfOutlined className="text-3xl text-red-600" />;
    }
    if (ext && ["doc", "docx", "odt"].includes(ext)) {
      icon = <FileWordOutlined className="text-3xl text-blue-600" />;
    }
    if (ext && ["xls", "xlsx", "csv", "ods"].includes(ext)) {
      icon = <FileExcelOutlined className="text-3xl text-emerald-600" />;
    }
    if (ext && ["ppt", "pptx", "odp"].includes(ext)) {
      icon = <FilePptOutlined className="text-3xl text-orange-600" />;
    }
    if (
      ext &&
      ["bmp", "gif", "jpeg", "jpg", "png", "tif", "tiff"].includes(ext)
    ) {
      return <Image src={link} height={64} />;
    }
    return (
      <Button
        block
        className="h-full"
        icon={icon}
        onClick={() => window.open(link, "_blank")}
      />
    );
  };

  const [form] = Form.useForm<FormProps>();

  const onFinish = ({ comment }: FormProps) => {
    createComment({ comment, issue_id: Number(id) })
      .then(() => {
        toast.success("Comentario criado com sucesso!");
        form.resetFields();
      })
      .catch(() => {
        toast.error("Erro ao criar o comentario!");
      });
  };

  return (
    <Space direction="vertical">
      <Card loading={isUsersLoading || isIssuesLoading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Descriptions
              layout="vertical"
              column={{ lg: 4, md: 2, sm: 1 }}
              bordered
            >
              <Descriptions.Item label="Experimento" span={4}>
                {`${issueData?.experiment_id} - ${issueData?.experiment.name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Problema" span={4}>
                {issueData?.problem || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Gravidade">
                {handlePriority(issueData?.priority)}
              </Descriptions.Item>
              <Descriptions.Item label="Versão">
                {completeVersion(issueData?.version)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {issueData?.status || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Autor">
                {issueData?.creator.name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Responsável">
                {issueData?.responsible.name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Ambiente">
                {issueData?.issueTags.map((tag) => (
                  <TagField value={tag.name} color={getUniqueColor(tag.name)} />
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Data de Criação">
                <DateField
                  value={issueData?.created_at}
                  format="DD/MM/YYYY HH:mm"
                />
              </Descriptions.Item>
              <Descriptions.Item label="Data de Atualização">
                <DateField
                  value={issueData?.updated_at}
                  format="DD/MM/YYYY HH:mm"
                />
              </Descriptions.Item>
              <Descriptions.Item label="Descrição">
                <Typography.Paragraph className="text-justify whitespace-pre-wrap">
                  {issueData?.description || "-"}
                </Typography.Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24}>
            <Card>
              <Typography.Title level={5}>Documentos</Typography.Title>
              <Row gutter={[16, 16]}>
                {issueData?.issueFiles?.map((file) => (
                  <Col span={3}>
                    <Tooltip title={handleLinkName(file.name)}>
                      {handleExtension(file.name, file.link)}
                    </Tooltip>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Comentários" loading={isUsersLoading || isIssuesLoading}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="comment">
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" className="w-full" align="end">
              <Button type="primary" htmlType="submit" loading={isCreating}>
                Salvar
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider className="mb-8" />
        <Timeline
          mode="left"
          items={orderBy(issueData?.issueComments, "created_at", "desc").map(
            (comments) => ({
              children: (
                <Space direction="vertical" className="w-full">
                  <Typography.Title level={5}>
                    {dayjs(comments.created_at).calendar()} -{" "}
                    {comments.type === "Comment"
                      ? handleUser(comments.user_id)
                      : "Sistema"}{" "}
                    comentou:
                  </Typography.Title>
                  <Card type="inner">{comments.comment}</Card>
                </Space>
              ),
              color: comments.type === "Comment" ? "blue" : "gray",
            })
          )}
        />
      </Card>
    </Space>
  );
}
