import { handleLanguageName } from "@/utils/handleLanguageName";

const localesNames = [
  "es-ar",
  "en",
  "pt-br",
  "es",
  "es-es",
  "en-us",
  "pt",
  "de",
];

export const languageOptions = Intl.ListFormat.supportedLocalesOf(localesNames)
  .map((locale) => ({
    label: handleLanguageName(locale),
    value: locale,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
