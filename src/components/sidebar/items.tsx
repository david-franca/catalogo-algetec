import { useCan } from "@/hooks";
import {
  BookMarkedIcon,
  BookUserIcon,
  BrainCircuitIcon,
  BrainCogIcon,
  BugIcon,
  Building2,
  CalendarCheck2,
  ExternalLinkIcon,
  FileType2Icon,
  FlaskConicalIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  ListCheckIcon,
  RocketIcon,
  SparkleIcon,
  UserIcon,
  WaypointsIcon,
} from "lucide-react";
import { ElementType } from "react";

interface MenuItem {
  key: string;
  icon: ElementType;
  children?: MenuItem[];
  label: React.ReactNode;
  type?: "group";
}

export const useSidebarItems = () => {
  const can = useCan();

  const itemsList = [
    can("view", "Calendar")
      ? { label: "Dashboard", key: "dashboard", icon: LayoutDashboardIcon }
      : null,
    can("view", "Calendar")
      ? { label: "Calendário", key: "dashboard/calendar", icon: CalendarCheck2 }
      : null,
    {
      label: (
        <a
          target="_blank"
          href="https://catalogoalgetec.grupoa.education/login"
          rel="noreferrer"
        >
          Catálogo
        </a>
      ),
      key: "external",
      icon: ExternalLinkIcon,
    },
    can("view", "Institution")
      ? {
          label: "Instituições",
          key: "dashboard/institutions",
          icon: Building2,
        }
      : null,
    can("view", "User")
      ? { label: "Usuários", key: "dashboard/users", icon: UserIcon }
      : null,
    can("view", "Demand")
      ? { label: "Entregas", key: "dashboard/demands", icon: WaypointsIcon }
      : null,
    can("view", "Release")
      ? { label: "Lançamentos", key: "dashboard/releases", icon: RocketIcon }
      : null,
    can("view", "Checklist")
      ? { label: "Tarefas", key: "dashboard/checklists", icon: ListCheckIcon }
      : null,
    can("view", "Issue")
      ? { label: "Problemas", key: "dashboard/issues", icon: BugIcon }
      : null,
    can("view", "Experiment")
      ? { label: "Laboratórios", key: "dashboard/labs", icon: FlaskConicalIcon }
      : null,
    can("view", "Curriculum")
      ? {
          label: "Currículos",
          key: "dashboard/curriculums",
          icon: BookUserIcon,
          children: [
            {
              label: "Habilidades",
              key: "dashboard/curriculums/skills",
              icon: BrainCircuitIcon,
            },
            {
              label: "Práticas",
              key: "dashboard/curriculums/practices",
              icon: BrainCogIcon,
            },
          ],
        }
      : null,
    can("view", "Template")
      ? { label: "Documentos", key: "dashboard/documents", icon: FileType2Icon }
      : null,
    can("view", "Documentation")
      ? { label: "Wiki", key: "dashboard/wiki", icon: BookMarkedIcon }
      : null,
    can("view", "Locale")
      ? { label: "Localização", key: "dashboard/locales", icon: LanguagesIcon }
      : null,
    { label: "Ferramentas de IA", key: "dashboard/chat", icon: SparkleIcon },
  ];

  return itemsList.filter(Boolean) as MenuItem[];
};
