import { redirect } from "react-router";

import { protectedRouteLoader } from "./auth-loader";

export const rootLoader = async () => {
  await protectedRouteLoader();

  throw redirect("/posts");
};
