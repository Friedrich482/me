import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import FallBackRender from "../suspense-error-boundary/ErrorBoundary";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import EditPostForm from "./EditPostForm";

const EditPost = () => (
  <main className="flex flex-1 items-start justify-center py-2">
    <section className="flex w-1/2 flex-col items-center justify-center gap-12 pt-8 max-xl:w-2/3">
      <div className="flex w-full flex-col gap-8">
        <Link
          to="/posts"
          className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
        >
          <ArrowLeft size={16} />
          <span> Back to posts </span>
        </Link>

        <h1 className="w-full text-start text-4xl font-bold">Edit Post</h1>
      </div>

      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <FallBackRender
            error={error}
            className="w-1/2 self-center pt-8 max-xl:w-2/3"
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <SuspenseBoundary className="h-[22rem] w-full max-xl:w-2/3">
          <EditPostForm />
        </SuspenseBoundary>
      </ErrorBoundary>
    </section>
  </main>
);

export default EditPost;
