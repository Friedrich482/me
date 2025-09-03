import { type ReactNode,Suspense } from "react";

import { Skeleton } from "@repo/ui/components/ui/skeleton";

const SuspenseBoundary = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Suspense fallback={<Skeleton className={className} />}>
      {children}
    </Suspense>
  );
};

export default SuspenseBoundary;
