import { useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { icons } from "@/features/fields/hooks/sidebarIcons";
import { cn, colorClasses, formatSlug } from "@/lib/utils";

/**
 * Um componente de "aside" que exibe uma faixa vertical ao lado do conteúdo principal.
 * O texto exibido é dinâmico, baseado nos parâmetros da rota atual (categoria ou subcategoria),
 * com um fallback para um texto padrão.
 *
 * @returns {React.ReactElement} Um elemento `<aside>` estilizado como uma faixa vertical.
 */
export function AppAside(): React.ReactElement {
  // Usamos `strict: false` para que o hook não gere erro em rotas que não possuem os parâmetros.
  const params = useParams({ strict: false });
  const { pathname } = useLocation();
  const { t } = useTranslation();

  let displayText = t("navUser.virtual");
  if ("subcategorySlug" in params && params.subcategorySlug) {
    displayText = formatSlug(params.subcategorySlug);
  } else if ("categorySlug" in params && params.categorySlug) {
    displayText = formatSlug(params.categorySlug);
  } else if ("/catalog/news" === pathname) {
    displayText = t("navUser.news");
  }

  const categoryColorName = icons.find(
    (icon) =>
      icon.title.toLowerCase() ===
      formatSlug(params.categorySlug ?? "").toLowerCase()
  )?.color as keyof typeof colorClasses | undefined;

  // Define as classes de cor a serem usadas, com um fallback para o padrão.
  const appliedClasses = categoryColorName
    ? colorClasses[categoryColorName]
    : { bg: "bg-muted", text: "text-muted-foreground" };

  return (
    // Container principal: define a largura, altura, cor de fundo e centraliza o conteúdo.
    // Adicionamos `sticky top-0` para que o componente permaneça fixo no topo durante o scroll.
    <aside
      className={cn(
        "hidden h-screen w-12 flex-col items-center justify-center md:flex sticky top-0",
        appliedClasses,
        {
          [colorClasses.fuchsia]: pathname === "/catalog/news",
          [colorClasses.cyan]: pathname === "/catalog",
        }
      )}
    >
      {/* Div interna para aplicar a rotação e o modo de escrita vertical */}
      <div className="transform-gpu rotate-180 [writing-mode:vertical-rl] select-none">
        <span className="whitespace-nowrap text-sm font-medium uppercase tracking-widest text-white">
          {displayText}
        </span>
      </div>
    </aside>
  );
}
