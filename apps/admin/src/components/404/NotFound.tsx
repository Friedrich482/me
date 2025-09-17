import { Link } from "react-router";

import usePageTitle from "@/hooks/usePageTitle";
import { Button } from "@repo/ui/components/ui/button";

const NotFound = () => {
  usePageTitle("Not Found | Friedrich WT");

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-12 pt-8 max-xl:w-2/3 max-sm:w-[90%]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-[9rem] font-bold">404</h1>
          <p className="-translate-y-5 text-2xl font-light">Not Found</p>
        </div>

        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
