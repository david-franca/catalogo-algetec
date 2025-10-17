import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Upload,
  UploadProps,
} from "antd";
import { MinusCircleIcon, PlusCircleIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useDemandExperimentSelect } from "@/services/department.service";
import { completeVersion } from "@/utils/completeVersion";
import { isValidVersion } from "@/utils/isValidVersion";

import { useLocaleCreate } from "@/services/locale.service";
import { languageOptions } from "./locales";

interface FormProps {
  language: string;
  experiment_id: string;
  version: string;
  content: { key: string; value: string }[];
}

export function LocalesCreateForm() {
  const [form] = Form.useForm<FormProps>();
  const { mutateAsync, isPending } = useLocaleCreate();

  const onFinish = (values: FormProps) => {
    mutateAsync({ data: [{ ...values }] })
      .then(() => {
        form.resetFields();
        toast.success("Localização criada com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao criar localização!");
      });
  };

  const [fileArray, setFileArray] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  const [isImporting, setIsImporting] = useState(false);

  const { data: experimentOptions } = useDemandExperimentSelect();

  const csvFileToArray = (
    fileValue: string | ArrayBuffer | null | undefined
  ) => {
    if (!fileValue) return;
    if (typeof fileValue === "string") {
      let separator = "";
      if (fileValue.includes('"""')) {
        separator = '"""';
      }
      if (fileValue.includes("\n")) {
        separator = "\n";
      }

      const regex = new RegExp(`[\r${separator}]`, "g");

      const csvRows = fileValue
        .slice(fileValue.indexOf(separator) + 1)
        .split(separator)
        .filter((el) => el.trim())
        .map((el) => el.trim().replace(regex, ""));

      const csvArray = csvRows.map((row) => {
        const values = row.split(";");
        const key = values[0];
        const value = values[1]?.split("//")[0].trim() || "";
        return { key, value };
      });
      setFileArray(csvArray);
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isTXT = file.type === "text/plain";
      const isCSV = file.type === "text/csv";
      if (!isTXT && !isCSV) {
        toast.error(`${file.name} não é um arquivo válido!`);
      }
      const fileReader = new FileReader();

      if ((file && isTXT) || isCSV) {
        setIsImporting(true);
        fileReader.onload = (event) => {
          const csvOutput = event.target?.result;
          csvFileToArray(csvOutput);
        };

        fileReader.readAsText(file);
      }

      return isTXT || isCSV ? false : Upload.LIST_IGNORE;
    },
    showUploadList: false,
    accept: [`text/plain`, `text/csv`].join(", "), // Accept only .txt and .csv files
    maxCount: 1,
  };

  useEffect(() => {
    const setAndValidateForm = async () => {
      if (fileArray.length > 0) {
        form.setFieldsValue({ content: fileArray });
        setIsImporting(false);

        // Força a validação do campo 'content' após a importação do arquivo
        try {
          await form.validateFields(["content"]);
        } catch (errorInfo) {
          console.log("Validation failed on import:", errorInfo);
        }
      }
    };
    setAndValidateForm();
  }, [fileArray, form]);

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="experiment_id"
          label="Experimento"
          rules={[{ required: true }]}
        >
          <Select
            options={experimentOptions}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item name="language" label="Idioma" rules={[{ required: true }]}>
          <Select
            options={languageOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item>
          <Upload {...props}>
            <Button
              block
              icon={<UploadCloudIcon className="h-4 w-4" />}
              loading={isImporting}
            >
              {isImporting ? "Importando..." : "Importar arquivo CSV ou TXT"}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="version"
          label="Versão"
          rules={[
            {
              required: true,
              message: "Preencha a versão",
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
              form.setFieldsValue({ version: completeVersion(e.target.value) })
            }
          />
        </Form.Item>
        <Form.List name="content">
          {(fields, { add, remove }) => (
            <div>
              <h2>Conteúdo</h2>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "key"]}
                    rules={[
                      { required: true, message: "Preencha a chave" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.resolve();
                          }
                          const contentValues = getFieldValue("content");
                          const duplicates = contentValues.filter(
                            (item: { key: string }, index: number) =>
                              item?.key === value && name !== index
                          );
                          if (duplicates.length > 0) {
                            return Promise.reject(
                              new Error("Chaves duplicadas não são permitidas.")
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="Chave" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Preencha o valor" }]}
                  >
                    <Input placeholder="Valor" />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    disabled={fields.length <= 1}
                    onClick={() => remove(name)}
                    icon={<MinusCircleIcon className="h-4 w-4" />}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusCircleIcon className="h-4 w-4" />}
                >
                  Adicionar valor
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
