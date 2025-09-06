import superjson from "superjson";

import type { AppRouter } from "@repo/trpc/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.PUBLIC_API_URL,
      transformer: superjson,
    }),
  ],
});

export default trpc;
