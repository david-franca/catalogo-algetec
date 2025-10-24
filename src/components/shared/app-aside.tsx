import { useParams } from "@tanstack/react-router";

import { icons } from "@/features/fields/hooks/sidebarIcons";
import { cn } from "@/lib/utils";

/**
 * Um componente de "aside" que exibe uma faixa vertical ao lado do conteúdo principal.
 * O texto exibido é dinâmico, baseado nos parâmetros da rota atual (categoria ou subcategoria),
 * com um fallback para um texto padrão.
 *
 * @returns {React.ReactElement} Um elemento `<aside>` estilizado como uma faixa vertical.
 */
const colorClasses = {
  red: "bg-red-500 dark:bg-red-900",
  green: "bg-green-500 dark:bg-green-900",
  blue: "bg-blue-500 dark:bg-blue-900",
  yellow: "bg-yellow-500 dark:bg-yellow-900",
  purple: "bg-purple-500 dark:bg-purple-900",
  orange: "bg-orange-500 dark:bg-orange-900",
  pink: "bg-pink-500 dark:bg-pink-900",
  gray: "bg-gray-500 dark:bg-gray-900",

  // Adicione outras cores conforme necessário
};

export function AppAside(): React.ReactElement {
  // Usamos `strict: false` para que o hook não gere erro em rotas que não possuem os parâmetros.
  const params = useParams({ strict: false });

  // Função para formatar o texto do slug (ex: "ciencias-da-natureza" -> "Ciencias Da Natureza")
  const formatSlug = (slug: string) => {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  let displayText = "Laboratórios Virtuais";
  if ("subcategorySlug" in params && params.subcategorySlug) {
    displayText = formatSlug(params.subcategorySlug);
  } else if ("categorySlug" in params && params.categorySlug) {
    displayText = formatSlug(params.categorySlug);
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
        "hidden h-screen w-12 flex-col items-center justify-center border-r md:flex sticky top-0",
        appliedClasses
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
