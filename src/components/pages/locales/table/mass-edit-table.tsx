import { useLocalesEdit } from "@/hooks/useLocalesEdit";
import { useLocationMassShow } from "@/services/locale.service";
import { Locale, LocalePair } from "@/types/locales";
import { completeVersion } from "@/utils/completeVersion";
import { handleLanguageName } from "@/utils/handleLanguageName";
import { Card, Tabs, TabsProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { MasEditForm } from "../form/mass-edit-form";

export type FormLocale = Locale & {
  originalPairs: LocalePair[];
};

export function LocaleMassEditTable() {
  const { selectedRowKeys } = useLocalesEdit();
  const { data: locales } = useLocationMassShow(selectedRowKeys);

  const [allLocales, setAllLocales] = useState<FormLocale[]>([]);

  const items = useMemo<TabsProps["items"]>(
    () =>
      allLocales?.map((locale) => ({
        label: `${handleLanguageName(locale.language)} - ${completeVersion(locale.version)}`,
        children: <MasEditForm locale={locale} />,
        key: locale.id.toString(),
      })),
    [allLocales]
  );

  useEffect(() => {
    if (locales) {
      const dataForm: FormLocale[] = [];

      const allPairs: LocalePair[] = [];

      locales.forEach((locale) => {
        locale.localePairs.forEach((pair) => {
          const pairObjeto = allPairs.find((p) => p.key === pair.key);

          if (pairObjeto && pairObjeto.value === "" && pair.value !== "") {
            const index = allPairs.findIndex((p) => p.key === pair.key);
            if (index !== -1) {
              allPairs[index] = {
                ...pair,
                value: pair.value,
              };
            }
          }

          if (!pairObjeto) {
            allPairs.push({
              ...pair,
              value: "",
            });
          }
        });
      });

      const newLocales = locales.map((locale) => {
        const pairs = allPairs.map((pair) => {
          const pairObjeto = locale.localePairs.find((p) => p.key === pair.key);

          return {
            ...pair,
            value: pairObjeto?.value || "",
          };
        });

        return {
          ...locale,
          localePairs: pairs,
          originalPairs: locale.localePairs,
        };
      });

      newLocales.forEach((locale) => {
        dataForm.push({
          id: locale.id,
          experiment_id: locale.experiment_id,
          user: locale.user,
          created_at: locale.created_at,
          updated_at: locale.updated_at,
          localePairs: locale.localePairs
            .slice()
            .sort((a, b) => a.key.localeCompare(b.key)),
          name: locale.name,
          user_id: locale.user_id,
          version: completeVersion(locale.version),
          language: locale.language,
          originalPairs: locale.originalPairs,
        });
      });
      setAllLocales(dataForm);
    }
  }, [locales]);
  return (
    <Card>
      <Tabs type="card" items={items} />
    </Card>
  );
}
