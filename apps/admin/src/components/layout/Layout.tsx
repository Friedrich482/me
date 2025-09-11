import { Outlet } from "react-router";

import { Toaster } from "@repo/ui/components/ui/sonner";

import Footer from "./Footer";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
