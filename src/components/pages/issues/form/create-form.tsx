import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  TabsProps,
  UploadFile,
} from "antd";
import { RcFile } from "antd/es/upload";
import { omit } from "lodash";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { TextField, UrlField } from "@/components/fields";
import { useIssueCreateForm } from "@/hooks/useIssueCreateForm";
import { useExperimentSelect } from "@/services/experiment.service";
import { useIssueCreate } from "@/services/issue.service";
import { useUserSelect } from "@/services/user.service";
import { ISSUES_STATUS } from "@/types/issue";
import { completeVersion } from "@/utils/completeVersion";
import { PRIORITY } from "@/utils/handlePriority";
import { isValidVersion } from "@/utils/isValidVersion";

import { IssuesItem } from "./items";

interface IssueCreateFormProps {
  experiment_id: string;
  responsible_id: number;
  version: string;
  problems: {
    [x: string]: {
      status: ISSUES_STATUS;
      problem: string;
      description?: string;
      priority: PRIORITY;
      tags?: number[];
      files?: UploadFile<RcFile>[];
    };
  };
}

type TargetKey = MouseEvent | KeyboardEvent | string;

interface FormProps {
  experiment_id?: string;
}

export function IssueCreateForm({ experiment_id }: FormProps) {
  const [form] = Form.useForm<IssueCreateFormProps>();

  const { mutateAsync: createIssue, isPending } = useIssueCreate();

  const [fileList, setFileList] = useState<{
    [x: string]: UploadFile<RcFile>[];
  }>({
    "1": [],
  });

  const { data: experimentsOptions, isLoading: experimentsLoading } =
    useExperimentSelect();
  const { data: usersOptions, isLoading: usersLoading } = useUserSelect();

  // Os itens iniciais do Tabs não são atualizados com o useMemo,
  // então precisa ser removido o uso dos tabs por enquanto
  // Deixando de ser uma criação múltipla para ser única.
  const initialItems: TabsProps["items"] = useMemo(
    () => [
      {
        label: "Problema 1",
        key: "1",
        children: (
          <IssuesItem
            newActiveKey="1"
            fileList={fileList}
            setFileList={setFileList}
          />
        ),
      },
    ],
    [fileList]
  );

  const [activeKey, setActiveKey] = useState("1");
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const { setForm } = useIssueCreateForm();

  const onChange = (newActiveKey: string) => {
    const values = form.getFieldsValue();
    setForm(values);
    setActiveKey(newActiveKey);
  };

  const add = useCallback(
    (i?: TabsProps["items"]) => {
      const newActiveKey = `tab${newTabIndex.current++}`;
      const newPanes = i ?? [...items];

      setFileList((prev) => ({ ...prev, [newActiveKey]: [] }));
      newPanes.push({
        label: `Problema ${newPanes.length + 1}`,
        children: (
          <IssuesItem
            newActiveKey={newActiveKey}
            fileList={fileList}
            setFileList={setFileList}
          />
        ),
        key: newActiveKey,
      });

      setItems(newPanes);
      setActiveKey(newActiveKey);
    },
    [fileList, items]
  );

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;

    setFileList((prev) => omit(prev, targetKey as string));
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const onFinish = useCallback(
    (values: IssueCreateFormProps) => {
      const problems = Object.values(values.problems).map((pro) => ({
        ...pro,
        tags: pro.tags?.length ? pro.tags : [],
      }));
      const payload = {
        experiment_id: values.experiment_id,
        responsible_id: values.responsible_id,
        version: values.version,
        problems,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      Object.values(fileList).forEach((file, index) => {
        file.forEach((f) => {
          formData.append(`files${index}`, f as RcFile);
        });
      });

      createIssue(formData)
        .then(() => {
          newTabIndex.current = 0;
          setItems([]);
          setFileList({});
          toast.success("Problema adicionado com sucesso");
        })
        .then(() => add([]))
        .catch(() => {
          toast.error("Erro ao adicionar problema");
        });
    },
    [add, createIssue, fileList]
  );

  useEffect(() => {
    if (experiment_id) {
      form.setFieldsValue({ experiment_id });
    }
  }, [experiment_id, form]);

  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ status: ISSUES_STATUS.NEW }}
      >
        <Form.Item
          label="Laboratório"
          name="experiment_id"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            options={experimentsOptions}
            loading={experimentsLoading}
          />
        </Form.Item>
        <Form.Item
          label="Responsável"
          name="responsible_id"
          rules={[
            {
              required: true,
              message: "Por favor, selecione uma opção.",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            allowClear
            showSearch
            options={usersOptions}
            loading={usersLoading}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              <TextField value="Versão" className="pr-2" />{" "}
              <UrlField value="/releases" target="_blank">
                (checar versões)
              </UrlField>
            </>
          }
          name="version"
          rules={[
            {
              required: true,
              message: "A versão é obrigatória!",
            },
            {
              validator(_, value) {
                if (isValidVersion(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Insira um valor válido"));
              },
            },
          ]}
        >
          <Input
            onBlur={(e) =>
              form.setFieldValue("version", completeVersion(e.target.value))
            }
          />
        </Form.Item>
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        />
        <Form.Item>
          <Space direction="vertical" className="w-full" align="center">
            <Button type="primary" htmlType="submit" loading={isPending}>
              Salvar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
