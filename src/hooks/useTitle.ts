import { handlePageName } from "@/utils/handlePageName";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const useTitle = () => {
  const { pathname } = useLocation();

  const pageName = pathname.split("/").pop();

  const title = handlePageName(pageName || "");

  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (!isNaN(Number(title))) return;

    if (document.title !== title) document.title = `${title} | Algetec`;

    const originalTitleValue = originalTitle.current;

    return () => {
      document.title = originalTitleValue || "Plataforma | Algetec";
    };
  }, [documentDefined, title]);
};
