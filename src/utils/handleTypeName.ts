/**
 * Maps a given type to its corresponding translation.
 *
 * @param {string} type - The type to be mapped.
 * @return {string} The translated value of the type.
 */
export const handleTypeName = (type: string): string => {
  switch (type) {
    case "Scripting":
      return "Roteirização";
    case "Testing":
      return "Testes";
    case "Coding":
      return "Programação";
    case "Modeling":
      return "Modelagem";
    case "Designing":
      return "Design Gráfico";
    case "Admin":
      return "Administrador";
    default:
      return type;
  }
};
