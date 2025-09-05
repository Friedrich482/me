import { Book, type LucideProps, Pencil } from "lucide-react";

import type { Status } from "./types-schemas";

export const STATUS_OPTIONS: { text: string; status: Status }[] = [
  { text: "Published", status: "published" },
  { text: "Draft", status: "draft" },
  { text: "All", status: undefined },
];

export const AUTH_DROPDOWN_ITEMS: {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  url: string;
}[] = [
  {
    text: "Posts",
    Icon: Book,
    url: "/posts",
  },
  {
    text: "Create",
    Icon: Pencil,
    url: "/create",
  },
];
