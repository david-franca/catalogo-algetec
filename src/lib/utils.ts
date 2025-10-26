import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isZodError(error: Error): error is ZodError {
  return error instanceof ZodError;
}

export function isAxiosError(error: Error): error is AxiosError {
  return error instanceof AxiosError;
}

export function capitalizeSentence(sentence: string) {
  const words = sentence.toLowerCase().split(" ");
  const capitalizedWords = words.map((word) => {
    const trimWord = word.trim();

    if (trimWord.length > 0) {
      return trimWord[0].toUpperCase() + trimWord.slice(1);
    }
    return trimWord;
  });

  return capitalizedWords.join(" ");
}

export const colorClasses = {
  red: "bg-red-500 dark:bg-red-900",
  green: "bg-green-500 dark:bg-green-900",
  blue: "bg-blue-500 dark:bg-blue-900",
  yellow: "bg-yellow-500 dark:bg-yellow-900",
  purple: "bg-purple-500 dark:bg-purple-900",
  orange: "bg-orange-500 dark:bg-orange-900",
  pink: "bg-pink-500 dark:bg-pink-900",
  gray: "bg-gray-500 dark:bg-gray-900",
  fuchsia: "bg-fuchsia-500 dark:bg-fuchsia-900",
  cyan: "bg-cyan-500 dark:bg-cyan-900",
};

export const formatSlug = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
