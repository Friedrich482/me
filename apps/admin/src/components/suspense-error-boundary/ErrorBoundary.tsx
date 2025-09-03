import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (error.message.toLowerCase().includes("not found")) {
      navigate("not-found", { replace: true });
    }
  }, []);

  return (
    <div className={cn("flex w-full flex-col gap-4 p-2", className)}>
      <h2 className="flex gap-2 text-2xl">
        <TriangleAlert className="text-destructive size-8" />
        <span className="text-destructive">Something went wrong</span>
      </h2>
      <div className="text-destructive flex flex-col items-start justify-center gap-2 text-xl">
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
