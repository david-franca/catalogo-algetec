import axios, {AxiosInstance} from "axios";

import {useAuth} from "@/hooks";

const baseUrl = import.meta.env.VITE_API_URL;

// const baseUrl = "http://127.0.0.1:3333/api";

class HttpClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
            paramsSerializer: {
                indexes: null,
            },
        });

        // Adiciona um interceptor para incluir o token em todas as requisições
        this.axiosInstance.interceptors.request.use((config) => {
            const token = this.getToken();
            if (token && config.headers) {
                // Configura headers utilizando os métodos do AxiosHeaders, se aplicável
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            return config;
        });
    }

    getClient(): AxiosInstance {
        return this.axiosInstance;
    }

    private getToken(): string | null {
        // Acessa o token diretamente do Zustand
        return useAuth.getState().token;
    }
}

export const apiClient = new HttpClient(baseUrl).getClient();
