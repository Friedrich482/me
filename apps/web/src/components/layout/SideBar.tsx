import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { HEADER_LINKS, NAVBAR_LINKS } from "@/constants";
import useOutsideClick from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";

const SideBar = ({ pathName }: { pathName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  const handleCloseButtonClick = () => setIsOpen(false);

  const ref = useOutsideClick(setIsOpen);

  return (
    <div className="relative hidden max-[28.25rem]:flex">
      {/* Side bar trigger */}
      <Button
        size="icon"
        onClick={handleClick}
        aria-label="Toggle sidebar menu"
        aria-expanded={isOpen}
      >
        <Menu />
      </Button>
      {/* Sidebar */}
      <div
        className={cn(
          "border-primary bg-background fixed top-0 z-50 hidden h-[105%] w-64 translate-x-40 flex-col gap-20 rounded-sm border p-8 transition duration-300 ease-in max-[28.25rem]:flex",
          isOpen && "-translate-x-44",
        )}
        ref={ref}
      >
        <Button
          onClick={handleCloseButtonClick}
          size="icon"
          className="absolute right-8"
          aria-label="close side bar"
        >
          <X />
        </Button>
        <ul className="flex w-full flex-col items-center justify-start gap-4 pt-20 text-2xl">
          {NAVBAR_LINKS.map((entry) => (
            <li
              className={cn(
                "hover:text-foreground border-primary w-full rounded-md border p-2 text-center",
                pathName === entry.link && "text-primary hover:text-primary",
              )}
              key={entry.text}
            >
              <a href={entry.link} className="h-full">
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 pt-8">
          <h2 className="text-2xl">Socials</h2>
          <div className="flex flex-col gap-2">
            {HEADER_LINKS.map(({ Icon, link, title }) => (
              <a
                href={link}
                target="_blank"
                className="hover:border-primary group flex w-auto gap-3 rounded-md border border-neutral-600 p-1"
                key={link}
              >
                <Icon
                  size={20}
                  className="hover:text-primary group-hover:text-primary"
                />
                <span>{title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
