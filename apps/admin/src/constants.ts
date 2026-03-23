import { Book, type LucideProps, Pencil } from "lucide-react";

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
