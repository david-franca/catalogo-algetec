import { Button, Card, Descriptions, Form, Input, Space } from "antd";
import { toast } from "sonner";

import { useAuth, useBreakpoint } from "@/hooks";
import { useUserEdit } from "@/services/user.service";
import { handleTypeName } from "@/utils";

const { Item } = Descriptions;

interface IFormValues {
  password: string;
  confirmPassword: string;
}

export function ProfilePage() {
  const { user } = useAuth();

  const [form] = Form.useForm();

  const { isAboveLg } = useBreakpoint("lg");

  const { mutateAsync, isPending } = useUserEdit();

  const onFinish = (values: IFormValues) => {
    if (user) {
      mutateAsync({ id: user.id, password: values.password })
        .then(() => {
          form.resetFields();
          toast.success("Senha alterada com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao alterar senha!");
        });
    }
  };

  return (
    <Card title="Perfil">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {user ? (
          <Descriptions
            bordered
            column={1}
            layout={isAboveLg ? "horizontal" : "vertical"}
          >
            <Item label="Nome">{user.name}</Item>
            <Item label="E-mail">{user.email}</Item>
            <Item label="Equipe">{handleTypeName(user.department.name)}</Item>
            <Item label="Nível de Acesso">{user.role.name}</Item>
          </Descriptions>
        ) : null}
        <Card type="inner" title="Alterar Senha">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Nova Senha"
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Nova senha é obrigatória",
                },
                {
                  min: 6,
                  message: "Nova senha precisa ter no mínimo 6 caracteres.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirme a Senha"
              name="confirmPassword"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Confirmação da senha é obrigatória.",
                },
                {
                  min: 6,
                  message:
                    "Confirmação da senha precisa ter no mínimo 6 caracteres.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "As duas senhas que você digitou não correspondem!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button htmlType="submit" type="primary" loading={isPending}>
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Card>
  );
}
