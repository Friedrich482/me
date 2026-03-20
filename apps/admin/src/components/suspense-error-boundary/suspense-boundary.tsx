import { type ReactNode, Suspense } from "react";

import { Skeleton } from "@repo/ui/components/ui/skeleton";

export const SuspenseBoundary = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Suspense fallback={<Skeleton className={className} />}>{children}</Suspense>
);
