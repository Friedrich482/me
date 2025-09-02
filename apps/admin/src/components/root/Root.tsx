import PostsList from "./PostsList";
import SuspenseBoundary from "../suspense-error-boundary/SuspenseBoundary";
import { ErrorBoundary } from "react-error-boundary";
import FallBackRender from "../suspense-error-boundary/ErrorBoundary";

const Root = () => {
  return (
    <main className="flex-1 flex items-start justify-center py-2">
      <section className="flex w-3/6 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
        <h1 className="text-4xl font-bold w-full text-start">Posts List</h1>
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

export default Root;
