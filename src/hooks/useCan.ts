import { CrudStatus, Pages } from "@/types/permissions";
import { useAuth } from "./useAuth";

/**
 * Returns a function that checks if the user has the required permission to perform a CRUD operation on a specific page.
 * @returns - A function that takes in a CRUD status and a page name, and returns a boolean indicating whether the user has the required permission.
 */
export function useCan() {
  const { permissions } = useAuth();

  return (crudStatus: CrudStatus, page: Pages) => {
    if (!permissions) return false;
    if (!permissions[page]) return false;
    return permissions[page].includes(crudStatus);
  };
}
