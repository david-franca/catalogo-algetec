import { nanoid } from "nanoid";
import { ReactNode } from "react";

import { TagField, TextField } from "@/components/fields";

export enum PRIORITY {
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  CRITICAL = 4,
}

/**
 * Returns the appropriate priority tag based on the given priority value.
 *
 * @param {number} priority - The priority value to determine the tag.
 * @param {boolean} [onlyValue] - Optional flag to indicate if only the tag value should be returned without rendering the tag component.
 * @return {string | ReactNode} - The tag value or the tag component based on the priority and the onlyValue flag.
 */
export const handlePriority = (
  priority: number,
  onlyValue?: boolean
): string | ReactNode => {
  switch (priority) {
    case PRIORITY.LOW:
      return typeof onlyValue !== "undefined" && onlyValue ? (
        "Baixa"
      ) : (
        <TagField key={nanoid()} value="Baixa" color="#62C450" />
      );
    case PRIORITY.NORMAL:
      return typeof onlyValue !== "undefined" && onlyValue ? (
        "Normal"
      ) : (
        <TagField key={nanoid()} value="Normal" color="#FFD827" />
      );
    case PRIORITY.HIGH:
      return typeof onlyValue !== "undefined" && onlyValue ? (
        "Alta"
      ) : (
        <TagField key={nanoid()} value="Alta" color="#F78D37" />
      );
    case PRIORITY.CRITICAL:
      return typeof onlyValue !== "undefined" && onlyValue ? (
        "Crítica"
      ) : (
        <TagField key={nanoid()} value="Crítica" color="#D42A34" />
      );

    default:
      return typeof onlyValue !== "undefined" && onlyValue ? (
        "-"
      ) : (
        <TextField value="-" />
      );
  }
};

/**
 * Converts a text priority to a corresponding priority value.
 *
 * @param {string} priority - The text representation of the priority.
 * @return {PRIORITY | undefined} The corresponding priority value.
 */
export const handleTextPriority = (priority: string): PRIORITY | undefined => {
  switch (priority) {
    case "Baixa":
      return PRIORITY.LOW;
    case "Normal":
      return PRIORITY.NORMAL;
    case "Alta":
      return PRIORITY.HIGH;
    case "Crítica":
      return PRIORITY.CRITICAL;
    default:
      return undefined;
  }
};
