import { StrictMode } from "react";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import * as z from "zod";
import { pt } from "zod/locales";
import "./index.css";
import "./lib/i18n";

import { routeTree } from "./routeTree.gen";

z.config(pt());
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
