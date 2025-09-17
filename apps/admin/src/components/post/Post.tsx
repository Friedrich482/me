import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router";
import { ArrowLeft, Pencil } from "lucide-react";

import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { Button } from "@repo/ui/components/ui/button";

import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import PostArticle from "./PostArticle";

const Post = () => {
  const { slug } = useSafeParams(ParamsSchema);

  return (
    <main className="flex flex-1 flex-col items-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-8 pt-8 max-xl:w-2/3 max-sm:w-[90%]">
        <div className="flex w-full items-center justify-between">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to posts</span>
          </Link>

          <Button asChild>
            <Link
              to={`/posts/${slug}/edit`}
              className="flex w-24 items-center justify-center gap-1"
            >
              <Pencil />
              <span>Edit</span>
            </Link>
          </Button>
        </div>

        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <FallBackRender
              error={error}
              className="w-1/2 self-center pt-8"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <SuspenseBoundary className="h-[22rem] w-full">
            <PostArticle />
          </SuspenseBoundary>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Post;
