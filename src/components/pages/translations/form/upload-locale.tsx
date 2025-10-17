import { Button, Card, Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateUnity } from "@/services/translation.service";
import { CreateUnity } from "@/types/translations";
import { completeVersion } from "@/utils/completeVersion";
import { isValidVersion } from "@/utils/isValidVersion";

import { languageOptions } from "../../locales/form/locales";

export function UploadLocaleForm() {
  const [uploadFile, setUploadFile] = useState<RcFile | null>(null);
  const [form] = Form.useForm<CreateUnity>();
  const { mutateAsync, isPending } = useCreateUnity();

  const onFinish = (values: CreateUnity) => {
    mutateAsync(values).then(() => {
      form.resetFields();
      setUploadFile(null);
    });
  };
  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          language: "all",
        }}
      >
        <Form.Item name="experiment_id" label="ID">
          <Input placeholder="Digite um ID" />
        </Form.Item>
        <Form.Item name="language" label="Selecione o idioma">
          <Select
            placeholder="Selecione o idioma"
            showSearch
            optionFilterProp="label"
            options={[
              {
                label: "Todos",
                value: "all",
              },
              ...languageOptions,
            ]}
          />
        </Form.Item>
        <Form.Item
          name="version"
          label="Versão"
          required
          rules={[
            {
              required: true,
              message: "A versão é obrigatória.",
            },
            {
              validator: (_, value) => {
                if (!isValidVersion(value)) {
                  return Promise.reject(
                    new Error("A versão deve ser no formato x.x.x.x")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            placeholder="Digite a versão"
            onBlur={(e) =>
              form.setFieldValue("version", completeVersion(e.target.value))
            }
          />
        </Form.Item>
        <Form.Item name="file" label="Arquivo">
          <Upload
            maxCount={1}
            fileList={uploadFile ? [uploadFile] : []}
            accept={["text/csv", "text/plain"].join(", ")}
            onRemove={() => {
              setUploadFile(null);
              return true;
            }}
            beforeUpload={(e) => {
              const isTXT = e.type === "text/plain";
              const isCSV = e.type === "text/csv";
              if (!isTXT && !isCSV) {
                toast.error("Apenas arquivos .csv e .txt são permitidos");
              }
              setUploadFile(e);
              return isTXT || isCSV ? false : Upload.LIST_IGNORE;
            }}
          >
            <Button>Selecione um arquivo</Button>
          </Upload>
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Subir
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
