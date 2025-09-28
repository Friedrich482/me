import { useState } from "react";
import { Menu, X } from "lucide-react";

import { HEADER_LINKS, NAVBAR_LINKS } from "@/constants";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

const SideBar = ({ pathname }: { pathname: string }) => {
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
          "border-primary bg-background fixed top-0 z-[100] hidden h-[105%] w-64 translate-x-40 flex-col gap-20 rounded-sm border p-8 transition duration-200 ease-in max-[28.25rem]:flex",
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
                "hover:text-foreground flex w-full cursor-pointer items-center justify-center rounded-md border p-2",
                entry.link !== "/" &&
                  pathname.includes(entry.link) &&
                  "text-primary hover:text-primary border-primary",
                entry.link === "/" &&
                  pathname === "/" &&
                  "text-primary hover:text-primary border-primary",
              )}
              key={entry.text}
            >
              <a href={entry.link} className="size-full text-center">
                {entry.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex flex-col gap-4 pt-8">
          <h2 className="text-2xl">Socials</h2>
          <div className="flex flex-col items-start gap-2">
            {HEADER_LINKS.map(({ Icon, link, title }) => (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-primary group border-border flex gap-3 rounded-md border p-1.5"
                key={link}
              >
                <Icon
                  size={20}
                  className="hover:text-primary group-hover:text-primary"
                />
                <span className="hover:text-primary group-hover:text-primary">
                  {title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
