import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

import { TagRender } from "@/components/tagRender";
import { useReleaseShow, useReleaseUpdate } from "@/services/release.service";
import { useReleaseTypeSelect } from "@/services/releaseType.service";
import { ReleaseUpdate } from "@/types/release";

interface ReleaseEditFormProps {
  id: string;
}

interface FormValues {
  releaseTypes: string[];
  options: string[];
  description?: string;
}

export function ReleaseEditForm({ id }: ReleaseEditFormProps) {
  const [form] = Form.useForm<FormValues>();
  const { data: releaseTypesOptions, isLoading: releaseTypesLoading } =
    useReleaseTypeSelect();
  const { data, isLoading: releaseByIdLoading } = useReleaseShow(id);
  const { mutateAsync: updateRelease, isPending } = useReleaseUpdate(id);

  const onFinish = (values: FormValues) => {
    const update: ReleaseUpdate = {
      releaseTypes: values.releaseTypes.map((r) =>
        parseInt(r.split("#")[0], 10)
      ),
      id_0: values.options.includes("id_0"),
      id_5000: values.options.includes("id_5000"),
      id_6000: values.options.includes("id_6000"),
      play_store: values.options.includes("play_store"),
      languages: values.options.includes("languages"),
      platform_a: values.options.includes("platform_a"),
      description: values.description,
    };
    updateRelease(update)
      .then(() => toast.success("Versão atualizada com sucesso!"))
      .catch(() => toast.error("Erro ao atualizar versão!"));
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        releaseTypes: data.releaseType.map((r) => `${r.id}${r.color}`),
        options: [
          data.id_0 ? "id_0" : "",
          data.id_5000 ? "id_5000" : "",
          data.id_6000 ? "id_6000" : "",
          data.languages ? "languages" : "",
          data.play_store ? "play_store" : "",
          data.platform_a ? "platform_a" : "",
        ],
        description: data.description,
      });
    }
  }, [data, form]);

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
            disabled={releaseTypesLoading || releaseByIdLoading}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item name="options">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="id_0">ID +0</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="id_5000">ID +5000</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="id_6000">ID +6000</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="play_store">PlayStore</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="languages">Linguagens</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="platform_a">Plataforma A</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="description" label="Descrição">
          <Input.TextArea rows={5} />
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
