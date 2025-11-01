import { type LoaderFunctionArgs, redirect } from "react-router";

import { ParamsSchema } from "@/types-schemas";

import { protectedRouteLoader } from "./authLoader";

export const editPostLoader = async ({ params }: LoaderFunctionArgs) => {
  await protectedRouteLoader();

  const result = ParamsSchema.safeParse(params);

  if (!result.success) {
    throw redirect("/not-found");
  }

  return result.data;
};
