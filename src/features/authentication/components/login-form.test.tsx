import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  loginHandlerError401,
  loginHandlerError500,
} from "@tests/mocks/handlers";
import { server } from "@tests/mocks/server";
import { renderWithProviders } from "@tests/utils/renderWithProviders";
import { setupRouter } from "@tests/utils/setupRouter";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/app/store/authStore";

describe("LoginForm", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useAuthStore.persist.clearStorage();
    server.resetHandlers();
  });

  function setup() {
    const user = userEvent.setup();
    const router = setupRouter();
    const navigateSpy = vi.spyOn(router, "navigate");

    renderWithProviders(null, { router });

    return { user, navigateSpy };
  }

  describe("Cenários de Sucesso (O 'Caminho Feliz')", () => {
    it("deve logar com sucesso e redirecionar ao submeter credenciais válidas", async () => {
      const { user, navigateSpy } = setup();

      // Act
      const emailInput = await screen.findByRole("textbox", {
        name: /e-mail/i,
      });
      const passwordInput = screen.getByLabelText(/senha/i);
      const loginButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "usuario.correto@email.com");
      await user.type(passwordInput, "senha-correta-123");
      await user.click(loginButton);

      // Assert
      expect(loginButton).toBeDisabled();

      await waitFor(() => {
        expect(navigateSpy).toHaveBeenCalledWith({ to: "/dashboard" });
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
    });
  });

  describe("Cenários de Validação do Formulário (Erros do Lado do Cliente)", () => {
    it("deve mostrar erros de validação se os campos estiverem vazios ao submeter", async () => {
      const { user, navigateSpy } = setup();

      // Act
      const loginButton = await screen.findByRole("button", { name: /login/i });

      await user.click(loginButton);

      // Assert
      expect(
        await screen.findByText(/Por favor, insira um email válido./i)
      ).toBeInTheDocument();
      expect(screen.getByText(/A senha é obrigatória./i)).toBeInTheDocument();
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it("deve mostrar um erro de validação para um formato de e-mail inválido", async () => {
      const { user, navigateSpy } = setup();

      // Act
      const emailInput = await screen.findByRole("textbox", {
        name: /e-mail/i,
      });
      const loginButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "email-invalido@teste.com...");
      await user.click(loginButton);

      //Assert
      await waitFor(() => {
        expect(
          screen.getByText(/Por favor, insira um email válido./i)
        ).toBeInTheDocument();
      });
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe("Cenários de Resposta da API (Erros do Lado do Servidor)", () => {
    it("deve mostrar uma mensagem de erro ao submeter credenciais inválidas", async () => {
      const { user, navigateSpy } = setup();
      server.use(loginHandlerError401);

      // Act
      const emailInput = await screen.findByRole("textbox", {
        name: /e-mail/i,
      });
      const passwordInput = screen.getByLabelText(/senha/i);
      const loginButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "usuario.errado@email.com");
      await user.type(passwordInput, "senha-errada");
      await user.click(loginButton);

      // Assert
      expect(
        await screen.findByText(/Usuário ou senha inválidos/i)
      ).toBeInTheDocument();
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(loginButton).not.toBeDisabled();
    });

    it("deve mostrar um toast de erro genérico para uma falha 500 do servidor", async () => {
      const { user, navigateSpy } = setup();
      server.use(loginHandlerError500);

      const validEmail = "usuario.correto@email.com";
      const validPassword = "senha-correta-123";

      // Act
      const emailInput = await screen.findByRole("textbox", {
        name: /e-mail/i,
      });
      const passwordInput = screen.getByLabelText(/senha/i);
      const loginButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, validEmail);
      await user.type(passwordInput, validPassword);
      await user.click(loginButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/Erro ao fazer login/i)).toBeInTheDocument();
        // Verificações de segurança
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
        expect(loginButton).not.toBeDisabled();
      });
    });
  });
});
