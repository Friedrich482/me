import { Outlet } from "react-router";

import { ScrollToTopButton } from "@repo/ui/components/scroll-to-top-button";
import { Toaster } from "@repo/ui/components/ui/sonner";

import { Footer } from "./footer";
import { Header } from "./header/header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollToTopButton />
      <Toaster richColors />
      <Footer />
    </>
  );
};
