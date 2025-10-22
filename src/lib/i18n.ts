import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

void i18n
  // Carrega traduções da sua pasta /public/locales
  .use(Backend)
  // Detecta e armazena o idioma do usuário (localStorage, cookie, etc.)
  .use(LanguageDetector)
  // Passa a instância do i18n para a biblioteca do React
  .use(initReactI18next)
  // Inicializa o i18next com as configurações
  .init({
    // Idioma padrão caso a detecção falhe ou o idioma não seja suportado
    fallbackLng: "pt-BR",
    // Habilita logs no console apenas em modo de desenvolvimento
    debug: import.meta.env.DEV,

    interpolation: {
      // O React já faz a proteção contra XSS, então podemos desativar isso
      escapeValue: false,
    },
  });

export default i18n;
