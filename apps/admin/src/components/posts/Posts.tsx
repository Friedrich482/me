import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import { ErrorBoundary } from "react-error-boundary";
import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import PostsList from "./PostsList";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import type { Status } from "@/types-schemas";
import StatusDropDown from "./StatusDropDown";

const Posts = () => {
  const [status, setStatus] = useState<Status>(undefined);

  const handleStatusOptionClick = (status: Status) => setStatus(status);

  return (
    <main className="flex-1 flex items-start justify-center py-2">
      <section className="flex w-3/6 flex-col items-center justify-center gap-7 pt-8 max-md:w-5/6">
        <div className="flex items-center justify-between w-full max-[24rem]:flex-col gap-y-4 max-[24rem]:items-start">
          <h1 className="text-4xl font-bold text-start">Posts List</h1>
          <Button asChild>
            <Link
              to="/create"
              className="flex items-center justify-center gap-2"
            >
              <span>Create Post</span>
              <Plus />
            </Link>
          </Button>
        </div>

        <div className="flex gap-2 items-center justify-start rounded-sm w-full">
          <p>Posts to display:</p>
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
          <SuspenseBoundary className="w-5/6 h-80 self-start">
            <PostsList status={status} />
          </SuspenseBoundary>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Posts;
