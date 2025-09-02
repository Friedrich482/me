import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import { ErrorBoundary } from "react-error-boundary";
import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import PostsList from "./PostsList";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Posts = () => {
  return (
    <main className="flex-1 flex items-start justify-center py-2">
      <section className="flex w-3/6 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
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
            <PostsList />
          </SuspenseBoundary>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Posts;
