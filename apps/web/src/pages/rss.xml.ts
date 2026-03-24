import type { APIContext } from "astro";

import { type Outputs, trpc } from "@/utils/trpc";
import rss from "@astrojs/rss";

export async function GET(context: APIContext) {
  const posts = await trpc.posts.findAllPublished.query();
  const postsWithTagsPromises = await Promise.allSettled(
    posts.map(async (post) => ({
      ...post,
      tags: await trpc.tags.findAllTagsForPublishedPost.query({
        postSlug: post.slug,
      }),
    })),
  );

  if (postsWithTagsPromises.some((entry) => entry.status === "rejected")) {
    const reason = postsWithTagsPromises.find(
      (entry) => entry.status === "rejected",
    )?.reason;

    return new Response(`Failed to fetch post tags: ${reason}`, {
      status: 500,
    });
  }

  const postsWithTags = (
    postsWithTagsPromises as PromiseFulfilledResult<
      Outputs["posts"]["findAllPublished"][number] & {
        tags: Outputs["tags"]["findAllTagsForPublishedPost"];
      }
    >[]
  ).map((entry) => entry.value);

  return rss({
    title: "Friedrich WT",
    description: "Friedrich Wekenon Tokponto's Blog and portfolio",
    site: context.site!,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    customData: [
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      "<language>en</language>",
      "<docs>https://validator.w3.org/feed/docs/rss2.html</docs>",
      `<atom:link href="${new URL("/rss.xml", context.site).href}" rel="self" type="application/rss+xml" />`,
    ].join(""),

    items: postsWithTags.map((post) => ({
      title: post.title,
      link: `/blog/${post.slug}/`,
      pubDate: post.publishDate ?? new Date(),
      content: post.content,
      categories: post.tags.map((tag) => tag.slug),
      author: "friedrichcorner@gmail.com (Friedrich WT)",
    })),
  });
}
