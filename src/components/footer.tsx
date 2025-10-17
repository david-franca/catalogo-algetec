import { Layout } from "antd";

import darkLogo from "@/assets/img/dark.webp";

import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <Layout.Footer
      style={{ background: theme === "dark" ? "#000a14" : "#556F83" }}
      aria-hidden
    >
      <div className="flex items-center justify-center flex-col space-y-2">
        <img src={darkLogo} width={150} height={48} alt="Logo Branca" />
        <span className="text-white">
          &copy; 2025. Todos os direitos reservados. Desenvolvido por Algetec+
        </span>
      </div>
    </Layout.Footer>
  );
}
