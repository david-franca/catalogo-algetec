import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

import light from "@/assets/light.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/authentication/hooks/useLogin";
import {
  LoginSchema,
  type LoginFormData,
} from "@/features/authentication/schemas";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            noValidate
            onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                <p className="text-muted-foreground text-balance">
                  {t("login.subtitle")}
                </p>
              </div>
              <div className="grid gap-3" data-testid="email-input">
                <Label htmlFor="email">{t("login.emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("login.passwordLabel")}</Label>
                  <Link
                    to="/recover"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  {...register("password")}
                />
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" loading={isPending}>
                {t("login.submitButton")}
              </Button>
              <div className="text-center text-sm">
                {t("login.noAccount")}{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  {t("login.signUp")}
                </Link>
              </div>
            </div>
          </form>
          <div className=" relative hidden md:block bg-gradient-to-b from-[#00CAD2] to-[#189FAC]">
            <img
              src={light}
              alt="Ilustração de uma lâmpada acesa"
              className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale px-12"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <Trans i18nKey="login.terms.fullText">
          Ao clicar em continuar, você concorda com os nossos{" "}
          <a href="#">Termos de Serviço</a> e{" "}
          <a href="#">Política de Privacidade</a>.
        </Trans>
        {/* 
          TODO: Adicionar links reais. 
          Ex: <a href="/terms">Termos de Serviço</a>
        */}
      </div>
    </div>
  );
}
