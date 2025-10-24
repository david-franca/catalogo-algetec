import { Link, useMatches } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface CrumbData {
  tKey?: string; // Chave de tradução
  text?: string; // Texto dinâmico
  to?: string;
  disabled?: boolean;
}

export function AppBreadcrumb() {
  const { t } = useTranslation();
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumb)
    .map((match) => match.loaderData?.crumb as CrumbData);
  const routeToTitle = (route: string) => {
    return route
      .replace("/", "") // Remove a barra inicial
      .split("-") // Divide cada palavra
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palavra
      .join(" "); // Junta novamente em uma string
  };

  const getCrumbLabel = (crumb: CrumbData): string => {
    if (crumb.tKey) {
      return t(crumb.tKey); // Traduz a chave
    }
    if (crumb.text) {
      return routeToTitle(crumb.text); // Usa o texto dinâmico
    }
    return ""; // Fallback
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={crypto.randomUUID()}>
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                // A página atual (último item) pode ter um pouco mais de espaço.
                // `truncate` adiciona o "..." se o texto for muito longo.
                <BreadcrumbPage className="max-w-48 truncate md:max-w-64">
                  {getCrumbLabel(crumb)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    disabled={crumb.disabled}
                    to={crumb?.to}
                    // Define uma largura máxima e trunca o texto com "..."
                    className="max-w-32 truncate md:max-w-40"
                  >
                    {getCrumbLabel(crumb)}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
