import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { LoginResponse } from "@/features/authentication/schemas";
import { apiClient } from "@/lib/axios";

interface AuthState {
  token: string | null;
  user: LoginResponse["user"] | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (token: string, user: LoginResponse["user"]) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

// Envolva a criação da sua store com o middleware `persist`
export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        set({ token, isAuthenticated: true, user });
      },
      logout: () => {
        delete apiClient.defaults.headers.common.Authorization;
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // Nome da chave no localStorage
    }
  )
);

// --- PASSO CRÍTICO DE INICIALIZAÇÃO ---
// Esta parte garante que o estado seja carregado ANTES da primeira renderização
// e que o header do Axios seja configurado na hora certa.
const { token, user } = useAuthStore.getState() as AuthState;
if (token && user) {
  useAuthStore.getState().login(token, user);
}
