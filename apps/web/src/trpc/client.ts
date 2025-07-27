import type { AppRouter } from "@repo/trpc/router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import { API_URL } from "@/constants";

// @ts-expect-error: createTRPCClient type mismatch due to trpc internal errors
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_URL,
      transformer: superjson,
    }),
  ],
});

export default trpc;
