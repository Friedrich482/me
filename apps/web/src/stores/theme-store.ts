import { atom } from "nanostores";

import { getInitialTheme } from "@repo/ui/lib/utils";
import type { ResolvedTheme, Theme } from "@repo/ui/types-schemas";

export const appTheme = atom<{ theme: Theme; resolvedTheme: ResolvedTheme }>({
  theme: getInitialTheme(),
  resolvedTheme: "light",
});
