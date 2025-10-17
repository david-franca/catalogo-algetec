import { Button, Card, Divider, Form, Input } from "antd";
import { SaveAllIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { useInstitutionCreate } from "@/services/institutions.service";
import { InstitutionCreate } from "@/types/institution";
import { useNavigate } from "@tanstack/react-router";

export function InstitutionCreateForm() {
  const { mutate, isSuccess, isError, isPending } = useInstitutionCreate();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: InstitutionCreate) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      toast.success("Instituição criada com sucesso!");
      navigate({ to: "/dashboard/institutions" });
    } else if (isError) {
      toast.error("Erro ao criar a Instituição!");
    }
  }, [form, isError, isSuccess, navigate]);

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Nome"
          hasFeedback
          rules={[
            { required: true, message: "Campo obrigatório" },
            { min: 3, message: "Mínimo de 3 caracteres" },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveAllIcon className="h-4 w-4" />}
            loading={isPending}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </Card>
  );
}
