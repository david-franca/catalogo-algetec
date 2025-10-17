/**
 * Maps a given page name to its corresponding translated value in Portuguese.
 * If the single parameter is true, returns the singular form of the name.
 * If the single parameter is false, returns the plural form of the name.
 * @param {string} name - The page name to be mapped.
 * @param {boolean} single - Optional flag to indicate if the singular form should be returned.
 * @return {string} The translated value of the page name.
 */
export const handlePageName = (name: string, single?: boolean): string => {
  switch (name) {
    case "users":
      return single ? "Usuário" : "Usuários";
    case "institutions":
      return single ? "Instituição" : "Instituições";
    case "calendar":
      return "Calendário";
    case "demands":
      return single ? "Entrega" : "Entregas";
    case "locales":
      return "Localização";
    case "wiki":
      return "Wiki";
    case "archived":
      return "Arquivados";
    case "releases":
      return single ? "Lançamento" : "Lançamentos";
    case "checklists":
      return single ? "Tarefa" : "Tarefas";
    case "issues":
      return single ? "Problema" : "Problemas";
    case "labs":
      return single ? "Laboratório" : "Laboratórios";
    case "documents":
      return single ? "Documento" : "Documentos";
    case "practices":
      return single ? "Prática" : "Práticas";
    case "skills":
      return single ? "Habilidade" : "Habilidades";
    case "chat":
      return "Ferramentas de IA";
    case "analyze-scripts":
      return "Analisar Roteiros";
    case "generate-scripts":
      return "Gerar Roteiros";
    case "generate-objectives":
      return "Gerar Objetivos";
    case "create-rails":
      return "Criar Trilhas";
    case "generate-threshold-concepts":
      return "Gerar Conceitos Limite";
    case "profile":
      return "Profile";
    case "login":
      return "Login";
    case "create":
      return "Novo";
    case "edit":
      return "Editar";
    case "show":
      return "Visualizar";
    default:
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
};
