import { Outlet } from "react-router";

import ScrollToTopButton from "@repo/ui/components/ScrollToTopButton";
import { Toaster } from "@repo/ui/components/ui/sonner";

import Footer from "./Footer";
import Header from "./header/Header";

const Layout = () => {
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

export default Layout;
