import { Pages } from "@/types/pages";
import { CalendarListFilters } from "./calendar";
import { DemandListFilters } from "./demand";
import { InstitutionListFilters } from "./institution";
import { UserListFilters } from "./user";
import { LocaleListFilters } from "./locale";
import { IssueListFilters } from "./issue";
import { ReleaseListFilter } from "./release";
import { ChecklistListFilters } from "./checklist";
import { LabListFilters } from "./labs";
import { DocumentListFilters } from "./documents";

interface FilterProps {
  resource: Pages;
}

export function Filters({ resource }: FilterProps) {
  switch (resource) {
    case "demands":
      return <DemandListFilters />;
    case "institutions":
      return <InstitutionListFilters />;
    case "users":
      return <UserListFilters />;
    case "calendar":
      return <CalendarListFilters />;
    case "locales":
      return <LocaleListFilters />;
    case "issues":
      return <IssueListFilters />;
    case "releases":
      return <ReleaseListFilter />;
    case "checklists":
      return <ChecklistListFilters />;
    case "labs":
      return <LabListFilters />;
    case "documents":
      return <DocumentListFilters />;
    default:
      return null;
  }
}
