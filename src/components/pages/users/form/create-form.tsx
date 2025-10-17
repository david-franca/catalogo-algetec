import { Button, Card, Divider, Form, Input, Select } from "antd";
import { SaveAllIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { useDepartmentSelect } from "@/services/department.service";
import { useRoleSelect } from "@/services/role.service";
import { useUserCreate } from "@/services/user.service";
import { UserCreate } from "@/types/user";
import { useNavigate } from "@tanstack/react-router";

export function UserCreateForm() {
  const { data: rolesOptions, isLoading: rolesLoading } = useRoleSelect();
  const { data: departmentOptions, isLoading: departmentLoading } =
    useDepartmentSelect();
  const { mutate, isSuccess, isError, isPending } = useUserCreate();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: UserCreate) => {
    mutate({
      ...values,
      role_id: Number(values.role_id),
      department_id: Number(values.department_id),
    });
  };

  const isLoading = useMemo(
    () => rolesLoading || departmentLoading,
    [rolesLoading, departmentLoading]
  );

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      toast.success("Usuário criado com sucesso!");
      navigate({ to: "/dashboard/users" });
    } else if (isError) {
      toast.error("Erro ao criar o Usuário!");
    }
  }, [form, isError, isSuccess, navigate]);

  return (
    <Card loading={isLoading}>
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
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          rules={[
            { required: true, message: "Campo obrigatório" },
            { type: "email", message: "Email inválido" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="role_id"
            label="Cargo"
            hasFeedback
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select options={rolesOptions} loading={rolesLoading} />
          </Form.Item>
          <Form.Item
            name="department_id"
            label="Departamento"
            hasFeedback
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select options={departmentOptions} loading={departmentLoading} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha"
            hasFeedback
            rules={[
              { required: true, message: "Campo obrigatório" },
              { min: 6, message: "Mínimo de 6 caracteres" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar Senha"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Campo obrigatório" },
              { min: 6, message: "Mínimo de 6 caracteres" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não são iguais!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
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
