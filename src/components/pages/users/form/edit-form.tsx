import { Button, Card, Divider, Form, Input, Select } from "antd";
import { SaveAllIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { useDepartmentSelect } from "@/services/department.service";
import { useRoleSelect } from "@/services/role.service";
import { useUser, useUserEdit } from "@/services/user.service";
import { UserUpdate } from "@/types/user";
import { useParams } from "@tanstack/react-router";

export function UserEditForm() {
  const { data: rolesOptions, isLoading: rolesLoading } = useRoleSelect();
  const { data: departmentOptions, isLoading: departmentLoading } =
    useDepartmentSelect();
  const { id } = useParams({ from: "/dashboard/users/edit/$id" });

  const { data: user, isFetching } = useUser(id);
  const { mutateAsync, isPending } = useUserEdit();

  const [form] = Form.useForm<UserUpdate>();

  const onFinish = (values: UserUpdate) => {
    mutateAsync({ ...values, id: Number(id) })
      .then(() => {
        form.resetFields(["password", "confirmPassword"]);
        toast.success("Usuário atualizado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao atualizar o Usuário!");
      });
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role_id: user.role_id.toString(),
        department_id: user.department_id.toString(),
      });
    }
  }, [form, user]);

  return (
    <Card loading={isFetching}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Nome"
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
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select options={rolesOptions} loading={rolesLoading} />
          </Form.Item>
          <Form.Item
            name="department_id"
            label="Departamento"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select options={departmentOptions} loading={departmentLoading} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha"
            rules={[{ min: 6, message: "Mínimo de 6 caracteres" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar Senha"
            dependencies={["password"]}
            rules={[{ min: 6, message: "Mínimo de 6 caracteres" }]}
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
