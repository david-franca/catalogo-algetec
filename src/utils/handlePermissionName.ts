/**
 * Translates a permission name into a corresponding display name.
 *
 * @param {string} permissionName - The name of the permission.
 * @return {string} The corresponding display name.
 */
export function handlePermissionName(permissionName: string): string {
  let name: string;

  switch (permissionName) {
    case 'Demand':
      name = 'Entregas';
      break;
    case 'User':
      name = 'Usuários';
      break;
    case 'Calendar':
      name = 'Dashboard';
      break;
    case 'Permission':
      name = 'Permissões';
      break;
    case 'Checklist':
      name = 'Tarefas';
      break;
    case 'Curriculum':
      name = 'Currículos';
      break;
    case 'Experiment':
      name = 'Laboratórios';
      break;
    case 'Institution':
      name = 'Instituições';
      break;
    case 'Issue':
      name = 'Problemas';
      break;
    case 'Release':
      name = 'Lançamentos';
      break;
    case 'Template':
      name = 'Documentos';
      break;
    default:
      name = permissionName;
      break;
  }
  return name;
}
