import { ExperimentStatus } from "@/types/experiment";

/**
 * Returns a human-readable string representation of the given ExperimentStatus.
 * @param {ExperimentStatus} status - The status to be converted.
 * @returns {string} A human-readable string representation of the given status.
 */
export const handleStatus = (status: ExperimentStatus): string => {
  switch (status) {
    case ExperimentStatus.available:
      return "Disponível";
    case ExperimentStatus.unavailable:
      return "Indisponível";
    case ExperimentStatus.new:
      return "Lançamento";
    case ExperimentStatus.beta:
      return "Lançamento em Beta";
    default:
      return "";
  }
};
