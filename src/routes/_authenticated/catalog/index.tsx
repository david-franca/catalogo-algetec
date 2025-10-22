import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import mockup from "@/assets/mockup.webp";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/catalog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const openLink = () => {
    window.open(
      "https://plataformaa.com.br/laboratorios-virtuais/form",
      "_blank"
    );
  };

  return (
    <>
      <CardHeader>
        <h1 className="mb-4 text-3xl font-bold">{t("catalogIndex.title")}</h1>
      </CardHeader>
      <CardContent>
        <img
          src={mockup}
          alt="mockup"
          className="float-right ml-6 mb-4 max-w-md"
        />

        <p className="mb-4 text-lg">{t("catalogIndex.p1")}</p>
        <p className="mb-6 text-lg">{t("catalogIndex.p2")}</p>

        <h2 className="mb-2 text-xl font-semibold">
          {t("catalogIndex.journeyTitle")}
        </h2>
        <ol className="mb-6 list-inside list-decimal space-y-2 text-lg">
          <li>
            <Trans
              i18nKey="catalogIndex.journeyStep1"
              components={{ strong: <strong /> }}
            />
          </li>
          <li>
            <Trans
              i18nKey="catalogIndex.journeyStep2"
              components={{ strong: <strong /> }}
            />
          </li>
          <li>
            <Trans
              i18nKey="catalogIndex.journeyStep3"
              components={{ strong: <strong /> }}
            />
          </li>
        </ol>

        <p className="mb-4 text-lg">{t("catalogIndex.p3")}</p>
        <p className="mb-6 text-lg">
          <Trans
            i18nKey="catalogIndex.p4"
            components={{ strong: <strong /> }}
          />
        </p>
        <Button variant="destructive" onClick={openLink}>
          {t("catalogIndex.button")}
        </Button>
      </CardContent>
    </>
  );
}
