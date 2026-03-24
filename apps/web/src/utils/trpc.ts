import superjson from "superjson";

import type { AppRouter } from "@repo/trpc/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.PUBLIC_API_URL,
      transformer: superjson,
    }),
  ],
});

export type Outputs = inferRouterOutputs<AppRouter>;
