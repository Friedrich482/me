import { atom } from "nanostores";

import type { ResolvedTheme, Theme } from "@repo/ui/types-schemas";

export const appTheme = atom<{ theme: Theme; resolvedTheme: ResolvedTheme }>({
  theme: "dark",
  resolvedTheme: "dark",
});
