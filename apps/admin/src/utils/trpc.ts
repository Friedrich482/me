import superjson from "superjson";

import type { AppRouter } from "@repo/trpc/router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;

export const trpcLoaderClient = createTRPCClient<AppRouter>({
  links: [
    // trpc reads the http only cookie
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      transformer: superjson,
    }),
  ],
});
