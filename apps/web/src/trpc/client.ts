import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/trpc/router";
import { API_URL } from "@/constants";
import superjson from "superjson";

// @ts-expect-error
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_URL,
      transformer: superjson,
    }),
  ],
});

export default trpc;
