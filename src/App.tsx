import "primereact/resources/themes/lara-light-indigo/theme.css";

import { ConfigProvider } from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import calendar from "dayjs/plugin/calendar";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PrimeReactProvider } from "primereact/api";
import { HelmetProvider } from "react-helmet-async";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { Error404Page } from "./components/404";
import { ErrorPage } from "./components/error";
import { Toaster } from "./components/sonner";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./services/client";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.locale(ptBr);

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: Error404Page,
  defaultErrorComponent: ErrorPage,
  defaultViewTransition: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <ConfigProvider locale={locale}>
            <Toaster expand richColors />
            <RouterProvider router={router} />
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            />
          </ConfigProvider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
