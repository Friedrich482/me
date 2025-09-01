import Logo from "@/assets/signature.svg?react";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router";

const Header = () => (
  <header className="flex items-center justify-between gap-12 px-8 py-2">
    <Link to="/" aria-label="logo">
      <div className="hover:text-primary size-12 flex items-center justify-center">
        <Logo />
      </div>
    </Link>
    <ModeToggle />
  </header>
);

export default Header;
