import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type Theme } from "#types-schemas.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitialTheme = (
  defaultTheme: Theme = "system",
  storageKey = "theme",
) => {
  if (typeof localStorage !== "undefined") {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  }

  return defaultTheme;
};
