import { Link, useLoaderData } from "react-router";
import { format } from "date-fns";

import { usePageTitle } from "@/hooks/use-page-title";
import type { postLoader } from "@/loaders/post-loader";
import { useTRPC } from "@/utils/trpc";
import { MarkdownEditor } from "@repo/ui/components/markdown/markdown-editor";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PostArticle = () => {
  const { slug } = useLoaderData<typeof postLoader>();

  const trpc = useTRPC();

  const { data: post } = useSuspenseQuery(
    trpc.posts.findPost.queryOptions({ slug }),
  );
  const { data: postTags } = useSuspenseQuery(
    trpc.tags.findAllTagsForPost.queryOptions({ postSlug: post.slug }),
  );

  usePageTitle(post.title);

  return (
    <article className="flex w-full flex-col items-start justify-center gap-7 text-start">
      <div className="flex w-full flex-col">
        <MarkdownEditor
          markdown={`# ${post.title}\n ${post.publishDate ? format(post.publishDate, "MMM dd, yyyy") : ""}`}
          classNames={{ p: "opacity-70", h1: "max-sm:text-3xl" }}
        />
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col opacity-95">
          <MarkdownEditor markdown={post.content} />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3">
          {postTags.map((tag) => (
            <Link
              key={tag.slug}
              className="dark:bg-muted/40 bg-muted/75 rounded-md px-2 py-1 text-lg"
              to={`/posts#${tag.slug}`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};
