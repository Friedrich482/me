import type { Status } from "./types-schemas";

export const STATUS_OPTIONS: { text: string; status: Status }[] = [
  { text: "Published", status: "published" },
  { text: "Draft", status: "draft" },
  { text: "All", status: undefined },
];
