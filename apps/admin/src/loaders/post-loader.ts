import { type LoaderFunctionArgs, redirect } from "react-router";

import { ParamsSchema } from "@/types-schemas";
import { trpcLoaderClient } from "@/utils/trpc";

import { protectedRouteLoader } from "./auth-loader";

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  await protectedRouteLoader();

  const result = ParamsSchema.safeParse(params);

  if (!result.success) {
    throw redirect("/not-found");
  }

  const postExists = await trpcLoaderClient.posts.checkPostExists.query({
    slug: result.data.slug,
  });

  if (!postExists) {
    throw redirect("/not-found");
  }

  return result.data;
};
