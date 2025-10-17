import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import z from "zod";

import { useAuthStore } from "@/app/store/authStore";
import { isZodError } from "@/lib/utils";

import { loginRequest } from "../api/login";
import type { LoginFormData } from "../schemas";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login: setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginRequest(data),
    onSuccess: (data) => {
      const token = data.token.token;
      const user = data.user;
      setAuthState(token, user);

      void navigate({ to: "/catalog" });
    },
    onError: (error) => {
      if (isZodError(error)) {
        const zodError = z.prettifyError(error);
        toast.error(zodError);
        return;
      }

      if (isAxiosError(error) && error.response?.status === 401) {
        toast.error("Usuário ou senha inválidos");
        return;
      }

      toast.error("Erro ao fazer login");
    },
  });
};
