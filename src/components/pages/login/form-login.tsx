import { Button, Flex, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks";
import { LoginApiResponse } from "@/types/auth";
import { testEnvironment } from "@/utils/testEnvironment";
import { Turnstile } from "@marsidev/react-turnstile";
import { useMutation } from "@tanstack/react-query";

type Status = "error" | "expired" | "solved";
interface LoginRequest {
  email: string;
  password: string;
}

const baseUrl = import.meta.env.VITE_API_URL;
const isLocal = testEnvironment() === "local";
const siteKey = isLocal
  ? "1x00000000000000000000AA"
  : import.meta.env.VITE_TURNSTILE_SITE_KEY;

/**
 * LoginForm
 *
 * Formulario de login com captura de email e senha
 * Utiliza o hook `useAuth` para obter a função de autenticação
 * Utiliza o hook `useMutation` para fazer a requisição de login
 * Utiliza o componente `Turnstile` para capturar a resposta do captcha
 *
 * @returns JSX.Element
 */
export default function LoginForm() {
  const { signIn } = useAuth();
  const { isPending, mutateAsync: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: LoginRequest) => {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    },
  });
  const [form] = Form.useForm();
  const [status, setStatus] = useState<Status | null>();

  const onFinish = (values: LoginRequest) => {
    if (status === "expired") {
      return toast.warning(
        "Captcha expirada! Reinicie a página para tentar novamente."
      );
    }
    if (status === "error") {
      return toast.error("Captcha inválido! Tente novamente.");
    }
    login(values, {
      onSuccess: (res: LoginApiResponse) => {
        form.resetFields();
        setStatus(null);
        signIn({
          permissions: res.permissions,
          token: res.token.token,
          user: res.user[0],
        });
      },
    }).catch((error) => {
      console.error(error);

      toast.error("Email ou senha inválidos!");
    });
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            required: true,
            type: "email",
            message: "Por favor, insira um email válido!",
          },
        ]}
      >
        <Input size="large" placeholder="E-mail" type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Senha"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor, insira sua senha!",
          },
          {
            min: 6,
            message: "A senha deve ter pelo menos 6 caracteres",
          },
        ]}
      >
        <Input.Password size="large" placeholder="●●●●●●●●" type="password" />
      </Form.Item>
      <Flex justify="center">
        <Turnstile
          siteKey={siteKey}
          onError={() => setStatus("error")}
          onExpire={() => setStatus("expired")}
          onSuccess={() => setStatus("solved")}
          style={{ marginBottom: "1rem" }}
        />
      </Flex>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isPending}
          block
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
