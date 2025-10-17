import axios from "axios";

import { env } from "@/env";

export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
});

// Vamos configurar o interceptor dinamicamente após o login
apiClient.interceptors.request.use((config) => {
  // Esta lógica será preenchida pelo nosso estado do Zustand
  return config;
});
