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
