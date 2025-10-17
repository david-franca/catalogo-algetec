import { Button, Card, Form, Input, Select } from "antd";
import { toast } from "sonner";

import { TagRender } from "@/components/tagRender";
import { useAuth } from "@/hooks";
import { useExperimentSelect } from "@/services/experiment.service";
import { useReleaseCreate } from "@/services/release.service";
import { useReleaseTypeSelect } from "@/services/releaseType.service";
import { isValidVersion } from "@/utils/isValidVersion";

interface FormProps {
  experiment_id: string;
  releaseTypes: string[];
  version: string;
  description: string;
}

export function ReleaseCreateForm() {
  const [form] = Form.useForm<FormProps>();
  const { data: experimentOptions, isLoading: experimentsLoading } =
    useExperimentSelect();
  const { data: releaseTypesOptions, isLoading: releaseTypesLoading } =
    useReleaseTypeSelect();
  const { mutateAsync: createRelease, isPending } = useReleaseCreate();

  const { user } = useAuth();

  const onFinish = (values: FormProps) => {
    if (user) {
      const create = {
        ...values,
        user_id: user.id,
        releaseTypes: values.releaseTypes.map((releaseType) =>
          parseInt(releaseType.split("#")[0], 10)
        ),
      };
      createRelease(create)
        .then(() => {
          toast.success("Versão criada com sucesso!");
          form.resetFields();
        })
        .catch(() => {
          toast.error("Erro ao criar a versão!");
        });
    }
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="experiment_id"
          label="Prática"
          rules={[
            {
              required: true,
              message: "Selecione uma opção",
            },
          ]}
        >
          <Select
            placeholder="Selecione uma Prática"
            allowClear
            showSearch
            disabled={experimentsLoading}
            options={experimentOptions}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          name="releaseTypes"
          label="Tipo"
          rules={[
            {
              required: true,
              message: "Selecione pelo menos um tipo!",
            },
          ]}
        >
          <Select
            placeholder="Selecione um tipo"
            allowClear
            showSearch
            mode="tags"
            tagRender={TagRender}
            options={releaseTypesOptions}
            loading={releaseTypesLoading}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          name="version"
          label="Versão"
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
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          rules={[
            {
              required: true,
              message: "A descrição é obrigatória.",
            },
            {
              max: 10000,
              message: "A descrição precisa ter no máximo 10000 caracteres.",
            },
          ]}
        >
          <Input.TextArea maxLength={10000} showCount rows={5} />
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit" loading={isPending}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
