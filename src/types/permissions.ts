export type CrudStatus =
  | "view"
  | "create"
  | "update"
  | "delete"
  | "update_as_admin"
  | "update_as_leader"
  | "mass_update";

export type Pages =
  | "Calendar"
  | "Asset"
  | "Asset Request"
  | "Institution"
  | "User"
  | "Demand"
  | "Release"
  | "Checklist"
  | "Issue"
  | "Curriculum"
  | "Template"
  | "Experiment"
  | "Permission"
  | "Event"
  | "Documentation"
  | "Locale"
  | "Kanban";

export type Permissions = {
  [key in Pages]: CrudStatus[];
};
