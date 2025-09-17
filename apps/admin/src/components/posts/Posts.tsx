import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router";
import { Plus } from "lucide-react";

import usePageTitle from "@/hooks/usePageTitle";
import type { Status } from "@/types-schemas";
import { Button } from "@repo/ui/components/ui/button";

import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import PostsList from "./PostsList";
import StatusDropDown from "./StatusDropDown";

const Posts = () => {
  usePageTitle("Admin Blog | Friedrich WT");

  const [status, setStatus] = useState<Status>(undefined);

  const handleStatusOptionClick = (status: Status) => setStatus(status);

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-12 pt-8 max-xl:w-2/3 max-sm:w-[90%]">
        <div className="flex w-full items-center justify-between">
          <h1 className="w-full text-start text-4xl font-extrabold">
            Posts List
          </h1>

          <Button asChild>
            <Link
              to="/create"
              className="flex items-center justify-center gap-2"
            >
              <Plus />
              <span>Create Post</span>
            </Link>
          </Button>
        </div>

        <div className="flex w-full items-center justify-start gap-2 rounded-sm">
          <p className="text-xl">Display:</p>
          <StatusDropDown
            status={status}
            handleStatusOptionClick={handleStatusOptionClick}
          />
        </div>

        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <FallBackRender
              error={error}
              className="pt-8"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <SuspenseBoundary className="h-80 w-full">
            <PostsList status={status} />
          </SuspenseBoundary>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Posts;
