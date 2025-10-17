import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  FormListFieldData,
  Input,
  List,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { RcFile } from "antd/es/upload";
import dayjs, { Dayjs } from "dayjs";
import { capitalize } from "lodash";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ScrollArea } from "@/components/scrool-area";
import { TagRender } from "@/components/tagRender";
import { useAuth } from "@/hooks";
import { useChecklist } from "@/services/checklist.service";
import { useDemandCreate, useDemandTags } from "@/services/demand.service";
import { useDepartmentSelect } from "@/services/department.service";
import { useExperimentSelect } from "@/services/experiment.service";
import { useInstitutionSelect } from "@/services/institutions.service";
import { useUserSelect } from "@/services/user.service";
import { Result } from "@/types/assistant";
import { DemandCreate, DemandStatus } from "@/types/demand";
import { isBusinessDay, numberOfBusinessDays } from "@/utils/isBusinessDay";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Assistant } from "../assistant";
import { Checklist, IChecklistSelectProps } from "../assistant/checklist";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

type RangedArray = [Dayjs, Dayjs];

type Fields = {
  type: string;
  date_range: RangedArray;
  message: string;
  developers: number[];
  checklist_id: number;
  files: UploadFile<RcFile>[];
};

interface InitialValues {
  institution_id: number;
  experiment_id: string;
  status: DemandStatus;
  tags?: string[];
  list: Fields[];
}

export interface Checklists {
  index: number;
  checklist: IChecklistSelectProps;
}

export function CreateDemandPage() {
  const { data: institutionOptions, isLoading: institutionsLoading } =
    useInstitutionSelect();
  const { data: experimentOptions, isLoading: experimentsLoading } =
    useExperimentSelect();
  const { data: users, isLoading: usersLoading } = useUserSelect();
  const { data: tagsOptions, isLoading: tagsLoading } = useDemandTags();
  const { data: checklistsData } = useChecklist();
  const { data: teamsItems } = useDepartmentSelect("name");

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const checklists = useMemo(() => checklistsData || [], [checklistsData]);

  const [selectedKey, setSelectedKey] = useState<number>();

  const [result, setResult] = useState<Result>();
  const [open, setOpen] = useState(false);
  const [checklist, setChecklist] = useState<Checklists[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<{ [key: number]: string }>({
    0: "data",
    1: "data",
    2: "data",
    3: "data",
    4: "data",
    5: "data",
  });
  const [fileList, setFileList] = useState<{
    [key: number]: UploadFile<RcFile>[];
  }>({});
  const [form] = Form.useForm<InitialValues>();

  const { mutateAsync: storeDemand, isPending } = useDemandCreate();

  const currentUser = useAuth().user;

  const isAdmin = useMemo(
    () => (currentUser ? currentUser.role.demands_admin : false),
    [currentUser]
  );

  const onFinish = useCallback(
    (values: InitialValues) => {
      const demand: DemandCreate = {
        institution_id: values.institution_id,
        experiment_id: values.experiment_id,
        status: values.status,
        logger_id: currentUser ? currentUser.id : 0,
        tags: values.tags,
      };
      const formData = new FormData();
      values.list.forEach((value, index) => {
        const type = value.type;
        const _deadline = `${type}_deadline` as [
          "coding_deadline",
          "modeling_deadline",
          "ualab_deadline",
          "testing_deadline",
          "scripting_deadline",
        ][number];
        const _developers = `${type}_developers` as [
          "coding_developers",
          "modeling_developers",
          "ualab_developers",
          "testing_developers",
          "scripting_developers",
        ][number];
        const _startedAt = `${type}_startedAt` as [
          "coding_startedAt",
          "modeling_startedAt",
          "ualab_startedAt",
          "testing_startedAt",
          "scripting_startedAt",
        ][number];
        const _finishedAt = `${type}_finishedAt` as [
          "coding_finishedAt",
          "modeling_finishedAt",
          "ualab_finishedAt",
          "testing_finishedAt",
          "scripting_finishedAt",
        ][number];
        const _checklist_id = `${type}_checklist_id` as [
          "coding_checklist_id",
          "modeling_checklist_id",
          "ualab_checklist_id",
          "testing_checklist_id",
          "scripting_checklist_id",
        ][number];

        demand[_deadline] = numberOfBusinessDays(
          value.date_range[0].toDate(),
          value.date_range[1].toDate()
        )?.hours;
        demand[_developers] = value.developers;
        demand[_startedAt] = value.date_range[0]
          .set("seconds", 0)
          .set("milliseconds", 0)
          .toISOString();
        demand[_finishedAt] = value.date_range[1]
          .set("seconds", 0)
          .set("milliseconds", 0)
          .toISOString();
        demand[_checklist_id] = value.checklist_id;

        if (fileList[index]) {
          fileList[index].forEach((file) => {
            formData.append(`${type}_files[]`, file as RcFile);
          });
        }
      });
      formData.append("data", JSON.stringify(demand));
      storeDemand(formData)
        .then(() => {
          toast.success("Demanda criada com sucesso!");
          form.resetFields();
        })
        .catch(() => {
          toast.error("Erro ao criar demanda!");
        });
    },
    [currentUser, fileList, form, storeDemand]
  );

  const statusOptions = useMemo(
    () => [
      { value: DemandStatus.CORRECTION, label: "Correção" },
      { value: DemandStatus.DEVELOPMENT, label: "Desenvolvimento" },
      { value: DemandStatus.READY, label: "Pronto" },
      { value: DemandStatus.REVALIDATION, label: "Revalidação" },
      { value: DemandStatus.VALIDATION, label: "Validação" },
    ],
    []
  );

  const handleChecklist = useCallback(
    (type: string, key: number, name: number) => {
      const defaultChecklist = checklists.find((checklist) =>
        checklist.departments.find((dep) => dep.name === capitalize(type))
      );
      if (defaultChecklist) {
        const newChecklist = {
          checked: false,
          id: defaultChecklist.id,
          name: defaultChecklist.name,
          params: defaultChecklist.checklist_parameters.map((param) => ({
            checked: Boolean(param.checked),
            key: param.id,
            name: param.name,
            percentage: param.percentage,
          })),
        };
        setChecklist((prev) => {
          const check = prev.findIndex((value) => value.index === key);

          if (check >= 0) {
            prev[check].checklist = newChecklist;
          } else {
            prev.push({
              index: key,
              checklist: newChecklist,
            });
          }
          return prev;
        });
        form.setFieldValue(["list", name, "checklist_id"], defaultChecklist.id);
      }
    },
    [checklists, form]
  );

  const handleSelect = (name: number, key: number) => {
    const { list } = form.getFieldsValue();

    const types = list.map((type) => type.type);
    setSelectedItems(types);

    types.forEach((type) => {
      handleChecklist(type, key, name);
    });
  };

  const tabList = [
    {
      key: "data",
      tab: "Dados",
    },
    {
      key: "documents",
      tab: "Documentos",
    },
  ];

  const contentList = (
    fields: FormListFieldData[],
    name: number,
    key: number
  ) => {
    if (activeTabKey[key] === "data") {
      return (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={[name, "type"]}
              label="Tipo"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Selecione um tipo",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Select
                options={teamsItems}
                onSelect={() => handleSelect(name, key)}
              />
            </Form.Item>
            <Space>
              <Form.Item
                name={[name, "date_range"]}
                label="Prazo"
                rules={[
                  {
                    required: true,
                    message: "O prazo é obrigatório",
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}
              >
                <RangePicker
                  disabledDate={(date) => !isBusinessDay(date)}
                  format="DD/MM/YYYY HH:mm"
                  showNow
                  showTime={{ format: "HH:mm" }}
                  onChange={(value) => {
                    if (value?.[0] && value[1]) {
                      const businessDays = numberOfBusinessDays(
                        value[0].toDate(),
                        value[1].toDate()
                      );
                      if (businessDays) {
                        form.setFieldValue(
                          ["list", name, "message"],
                          businessDays.message
                        );
                      }
                    }
                  }}
                />
              </Form.Item>
              <Form.Item name={[name, "message"]} label="Total">
                <Input style={{ width: "100%" }} readOnly />
              </Form.Item>
            </Space>
            <Form.Item
              name={[name, "developers"]}
              label="Desenvolvedores"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  message: "Os responsáveis são obrigatórios",
                },
              ]}
            >
              <Select
                placeholder="Selecione um responsável"
                allowClear
                showSearch
                mode="multiple"
                disabled={usersLoading}
                options={users}
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Card style={{ height: "100%" }}>
              <Button
                block
                type="dashed"
                onClick={() => {
                  setOpen(true);
                  setSelectedKey(fields[key].key);
                }}
              >
                Selecionar lista de tarefas
              </Button>

              <ScrollArea>
                <List
                  style={{ marginTop: 8 }}
                  bordered
                  header={
                    <Space
                      align="center"
                      direction="vertical"
                      style={{ width: "100%" }}
                    >
                      <Typography.Text strong>
                        {
                          checklist.find((value) => value.index === key)
                            ?.checklist.name
                        }
                      </Typography.Text>
                    </Space>
                  }
                  dataSource={
                    checklist.find((value) => value.index === key)?.checklist
                      .params
                  }
                  renderItem={(item) => (
                    <List.Item key={nanoid()}>
                      <Row className="w-full">
                        <Col span={20}>
                          <Typography.Text>{item.name}</Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Typography.Text>{item.percentage}</Typography.Text>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </ScrollArea>
            </Card>
          </Col>
        </Row>
      );
    }
    if (activeTabKey[key] === "documents") {
      return (
        <ScrollArea>
          <div className="mr-4">
            <Upload
              fileList={fileList[name]}
              onRemove={(file) => {
                const index = fileList[name].indexOf(file);
                const newFileList = fileList[name].slice();
                newFileList.splice(index, 1);
                setFileList((prev) => ({ ...prev, [name]: newFileList }));
              }}
              beforeUpload={(file) => {
                setFileList((prev) => {
                  const files = prev[name] || [];
                  files.push(file);
                  return { ...prev, [name]: files };
                });
                return false;
              }}
              accept={[
                "image/bmp",
                "image/gif",
                "image/jpeg",
                "image/png",
                "image/svg+xml",
                "image/tiff",
                "text/plain",
                "application/pdf",
                "application/msword",
                "application/vnd.ms-excel",
                "application/vnd.ms-powerpoint",
                "application/vnd.oasis.opendocument.text",
                "application/vnd.oasis.opendocument.spreadsheet",
                "application/vnd.oasis.opendocument.presentations",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              ].join(", ")}
              showUploadList
            >
              <div className="w-40">
                <Button block type="dashed" icon={<UploadOutlined />}>
                  Carregar
                </Button>
              </div>
            </Upload>
          </div>
        </ScrollArea>
      );
    }
    return null;
  };

  useEffect(() => {
    if (result) {
      const values = [];
      const types: string[] = [];
      if (result.coding) {
        values.push({
          type: "coding",
          developers: [result.coding.developer],
          message: result.coding.message,
          date_range: [
            dayjs(result.coding.schedule.startedAt),
            dayjs(result.coding.schedule.finishedAt),
          ],
        });
        handleChecklist("coding", values.length - 1, values.length - 1);
        types.push("coding");
      }
      if (result.modeling) {
        values.push({
          type: "modeling",
          developers: [result.modeling.developer],
          message: result.modeling.message,
          date_range: [
            dayjs(result.modeling.schedule.startedAt),
            dayjs(result.modeling.schedule.finishedAt),
          ],
        });
        handleChecklist("modeling", values.length - 1, values.length - 1);
        types.push("modeling");
      }
      if (result.scripting) {
        values.push({
          type: "scripting",
          developers: [result.scripting.developer],
          message: result.scripting.message,
          date_range: [
            dayjs(result.scripting.schedule.startedAt),
            dayjs(result.scripting.schedule.finishedAt),
          ],
        });
        handleChecklist("scripting", values.length - 1, values.length - 1);
        types.push("scripting");
      }
      if (result.testing) {
        values.push({
          type: "testing",
          developers: [result.testing.developer],
          message: result.testing.message,
          date_range: [
            dayjs(result.testing.schedule.startedAt),
            dayjs(result.testing.schedule.finishedAt),
          ],
        });
        handleChecklist("testing", values.length - 1, values.length - 1);
        types.push("testing");
      }
      if (result.ualab) {
        values.push({
          type: "ualab",
          developers: [result.ualab.developer],
          message: result.ualab.message,
          date_range: [
            dayjs(result.ualab.schedule.startedAt),
            dayjs(result.ualab.schedule.finishedAt),
          ],
        });
        handleChecklist("ualab", values.length - 1, values.length - 1);
        types.push("ualab");
      }
      setSelectedItems(types);
      form.setFieldsValue({
        list: values,
      });
    }
  }, [form, handleChecklist, result]);

  return (
    <Card>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <Collapse defaultActiveKey={2} accordion>
          <Panel
            header={<Typography.Text strong>Assistente</Typography.Text>}
            key={1}
          >
            <Assistant onFinish={setResult} />
          </Panel>
          <Panel
            header={<Typography.Text strong>Editor</Typography.Text>}
            key={2}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                institution_id: undefined,
                experiment_id: undefined,
                status: DemandStatus.DEVELOPMENT,
                logger_id: currentUser ? currentUser.id : 0,
                tags: undefined,
              }}
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                <Card
                  title="Informações da demanda"
                  style={{ display: isAdmin ? undefined : "none" }}
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                      <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                          {
                            required: true,
                            message: "Selecione uma opção",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Selecione uma status"
                          allowClear
                          options={statusOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="institution_id"
                        label="Instituição"
                        rules={[
                          {
                            required: true,
                            message: "Selecione uma opção",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Selecione uma Instituição"
                          allowClear
                          showSearch
                          disabled={institutionsLoading}
                          options={institutionOptions}
                          optionFilterProp="label"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="experiment_id"
                        label="Laboratório"
                        rules={[
                          {
                            required: true,
                            message: "Selecione uma opção",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Selecione um Laboratório"
                          allowClear
                          showSearch
                          disabled={experimentsLoading}
                          options={experimentOptions}
                          optionFilterProp="label"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="tags" label="Tags">
                        <Select
                          mode="tags"
                          placeholder="Selecione ou adicione uma tag."
                          tagRender={TagRender}
                          loading={tagsLoading}
                          options={tagsOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Form.List
                  name="list"
                  initialValue={[
                    { type: "", date_range: [], message: "", developers: [] },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <Form.Item noStyle key={nanoid()}>
                      <Space
                        key={nanoid()}
                        direction="vertical"
                        style={{ width: "100%" }}
                      >
                        {fields.map(({ name, key }) => (
                          <Card
                            type="inner"
                            tabList={tabList}
                            onTabChange={(tabKey) => {
                              setActiveTabKey((prev) => ({
                                ...prev,
                                [key]: tabKey,
                              }));
                            }}
                            activeTabKey={activeTabKey[key]}
                            key={key}
                            tabBarExtraContent={
                              fields.length > 1 ? (
                                <MinusCircleOutlined
                                  onClick={() => {
                                    const values:
                                      | { type: string }[]
                                      | undefined = form.getFieldValue("list");
                                    if (values?.[name] && values[name].type) {
                                      const items = [...selectedItems];
                                      const index = items.indexOf(
                                        values[name].type
                                      );
                                      delete items[index];

                                      setSelectedItems([...new Set(items)]);
                                    }
                                    remove(name);
                                  }}
                                  style={{
                                    color: "#999",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                  }}
                                />
                              ) : null
                            }
                          >
                            {contentList(fields, name, key)}
                          </Card>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            disabled={fields.length >= 6}
                          >
                            Adicionar Campos
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  )}
                </Form.List>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button htmlType="submit" type="primary" loading={isPending}>
                    Salvar
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Panel>
        </Collapse>
      </Space>
      <Drawer
        width="40%"
        title="Checklist"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Checklist
          onOpen={setOpen}
          select={{
            id: checklist.find((value) => value.index === selectedKey)
              ?.checklist.id,
            name: checklist.find((value) => value.index === selectedKey)
              ?.checklist.name,
            params: checklist.find((value) => value.index === selectedKey)
              ?.checklist.params,
          }}
          onSelect={(value) => {
            if (typeof selectedKey !== "undefined") {
              setChecklist((prev) => {
                const check = prev.findIndex(
                  (value) => value.index === selectedKey
                );
                if (check >= 0) {
                  prev[check].checklist = value;
                } else {
                  prev.push({ index: selectedKey, checklist: value });
                }
                return prev;
              });
              form.setFieldValue(
                ["list", selectedKey, "checklist_id"],
                value.id
              );
            }
          }}
        />
      </Drawer>
    </Card>
  );
}
