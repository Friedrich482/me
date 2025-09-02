import { ErrorBoundary } from "react-error-boundary";
import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import PostSection from "./PostSection";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@repo/ui/components/ui/button";
import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";

const Post = () => {
  const { slug } = useSafeParams(ParamsSchema);

  return (
    <main className="flex-1 flex items-center flex-col py-2">
      <div className="flex justify-between items-center w-1/2 max-md:w-5/6 max-[18rem]:flex-col gap-y-4 max-[18rem]:items-start">
        <Link
          to="/posts"
          className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline "
        >
          <ArrowLeft size={16} />
          <span> Back to posts </span>
        </Link>

        <Button asChild>
          <Link
            to={`/posts/${slug}/edit`}
            className="flex items-center justify-center gap-1 w-24"
          >
            <span>Edit</span>
            <Pencil />
          </Link>
        </Button>
      </div>

      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <FallBackRender
            error={error}
            className="pt-8 w-1/2 max-md:w-5/6 self-center"
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <SuspenseBoundary className="w-1/2 h-[22rem] translate-y-14 max-md:w-5/6">
          <PostSection />
        </SuspenseBoundary>
      </ErrorBoundary>
    </main>
  );
};

export default Post;
