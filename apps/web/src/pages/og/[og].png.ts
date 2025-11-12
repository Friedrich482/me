import type { APIRoute } from "astro";

import trpc from "@/trpc/client";
import generateSvg from "@/utils/generateSvg";
import { Resvg } from "@resvg/resvg-js";

export async function getStaticPaths() {
  const posts = await trpc.posts.findAllPublished.query();

  return posts.map((post) => ({
    params: { og: post.slug },
    props: { ogTitle: post.title },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await generateSvg(props.ogTitle);

  const resvg = new Resvg(svg, null);
  const renderedPng = resvg.render();
  const pngBuffer = Buffer.from(renderedPng.asPng());

  return new Response(pngBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
