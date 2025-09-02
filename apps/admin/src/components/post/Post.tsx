import { ErrorBoundary } from "react-error-boundary";
import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import PostSection from "./PostSection";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const Post = () => {
  return (
    <main className="flex-1 flex items-center flex-col py-2">
      <Link
        to="/posts"
        className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline w-1/2 max-md:w-5/6"
      >
        <ArrowLeft size={16} />
        <span> Back to posts </span>
      </Link>

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
