const BASE_URL = import.meta.env.VITE_API_URL;

export const baseURL = (path: string) => {
  return new URL(path, `${BASE_URL}/`).toString();
};
