import { redirect } from "react-router";

import { trpcLoaderClient } from "@/utils/trpc";

// protects routes
export const protectedRouteLoader = async () => {
  try {
    const { isAuthenticated } =
      await trpcLoaderClient.auth.checkAuthStatus.query();

    return !isAuthenticated ? redirect("/login") : null;
  } catch {
    return redirect("/login");
  }
};

// prevents a logged in user to access an auth route
export const authRouteLoader = async () => {
  try {
    const { isAuthenticated } =
      await trpcLoaderClient.auth.checkAuthStatus.query();

    return isAuthenticated ? redirect("/") : null;
  } catch {
    return null;
  }
};
