import { Button } from "@repo/ui/components/ui/button";
import { TriangleAlert, RotateCcw } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

const FallBackRender = ({
  error,
  className,
  resetErrorBoundary,
}: {
  error: Error;
  className?: string;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className={cn("flex gap-4 flex-col p-2 w-full", className)}>
      <h2 className="text-2xl flex gap-2">
        <TriangleAlert className="text-destructive size-8" />
        <span className="text-destructive">Something went wrong</span>
      </h2>
      <div className="flex flex-col items-start justify-center gap-2 text-destructive text-xl">
        <p>{error.message}</p>
        <Button
          variant="outline"
          onClick={resetErrorBoundary}
          className="hover:text-destructive"
        >
          <RotateCcw /> Retry
        </Button>
      </div>
    </div>
  );
};

export default FallBackRender;
