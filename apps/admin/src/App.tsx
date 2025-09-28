import { useState } from "react";
import { Outlet } from "react-router";
import superjson from "superjson";

import type { AppRouter } from "@repo/trpc/router";
import { ThemeProvider } from "@repo/ui/providers/themeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  splitLink,
} from "@trpc/client";

import { TRPCProvider } from "./utils/trpc";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const App = () => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        splitLink({
          condition: (op) => isNonJsonSerializable(op.input),
          true: httpLink({
            url: import.meta.env.VITE_API_URL,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
            transformer: superjson,
          }),
          false: httpBatchLink({
            url: import.meta.env.VITE_API_URL,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
            transformer: superjson,
          }),
        }),
      ],
    }),
  );
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <Outlet />
        </TRPCProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
