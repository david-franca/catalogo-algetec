import _ from "lodash";

export const handleLanguageName = (value?: string) => {
  if (!value) return "";

  try {
    const languageNames = new Intl.DisplayNames(["pt-BR"], {
      type: "language",
    });
    const languageName = languageNames.of(value);

    return _.upperFirst(languageName);
  } catch {
    return "Sigla inválida";
  }
};
