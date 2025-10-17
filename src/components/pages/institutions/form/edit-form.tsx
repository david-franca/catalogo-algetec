import { Button, Card, Divider, Form, Input } from "antd";
import { SaveAllIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import {
  useInstitution,
  useInstitutionEdit,
} from "@/services/institutions.service";
import { InstitutionUpdate } from "@/types/institution";
import { useNavigate, useParams } from "@tanstack/react-router";

export function InstitutionEditForm() {
  const { mutate, isSuccess, isError, isPending } = useInstitutionEdit();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams({ from: "/dashboard/institutions/edit/$id" });
  const { data: institution, isFetching } = useInstitution(id);

  const onFinish = (values: InstitutionUpdate) => {
    mutate({ ...values, id: Number(id) });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      toast.success("Instituição atualizada com sucesso!");
      navigate({ to: "/dashboard/institutions" });
    } else if (isError) {
      toast.error("Erro ao criar a Instituição!");
    }
  }, [form, isError, isSuccess, navigate]);

  useEffect(() => {
    if (institution) {
      form.setFieldsValue({
        name: institution.name,
      });
    }
  }, [form, institution]);

  return (
    <Card loading={isFetching}>
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
