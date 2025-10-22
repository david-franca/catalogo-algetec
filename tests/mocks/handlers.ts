import { http, HttpResponse } from "msw";

import { env } from "@/env";
import { LoginSchema } from "@/features/authentication/schemas";

const API_BASE_URL = env.VITE_API_URL;
const VALID_CREDENTIALS = {
  email: "usuario.correto@email.com",
  password: "senha-correta-123",
};

// Handler para o cenário de sucesso do login
export const loginHandler = http.post(
  `${API_BASE_URL}/login`,
  async ({ request }) => {
    const body = LoginSchema.parse(await request.json());

    const mockSuccessResponse = {
      token: {
        type: "bearer",
        token: "msw-fake-opaque-token-12345",
      },
      user: {
        id: 1,
        email: "test@example.com",
        role: "admin",
        name: "Usuário de Teste",
        status: "active",
        mobile: "999999999",
        institution: null,
        expires_at: null,
        remember_me_token: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        prefix: null,
      },
    };
    if (
      body.email === VALID_CREDENTIALS.email &&
      body.password === VALID_CREDENTIALS.password
    ) {
      return HttpResponse.json(mockSuccessResponse);
    } else {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  }
);

export const loginHandlerError401 = http.post(`${API_BASE_URL}/login`, () => {
  return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
});

export const loginHandlerError500 = http.post(`${API_BASE_URL}/login`, () => {
  return HttpResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
});

// Agrupe todos os handlers que devem estar ativos por padrão
export const handlers = [loginHandler];
