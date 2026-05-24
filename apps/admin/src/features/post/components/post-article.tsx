import { Link } from "react-router";

import { type Outputs, useTRPC } from "@/utils/trpc";
import { convertDateToMediumFormat } from "@repo/common/convert-date-to-medium-format";
import { MarkdownRenderer } from "@repo/ui/components/markdown/markdown-renderer";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PostArticle = ({
  post,
}: {
  post: Outputs["posts"]["findPost"];
}) => {
  const trpc = useTRPC();

  const { data: postTags } = useSuspenseQuery(
    trpc.tags.findAllTagsForPost.queryOptions({ postSlug: post.slug }),
  );

  return (
    <article className="flex w-full flex-col items-start justify-center gap-7 text-start">
      <div className="flex w-full flex-col">
        <h1 className="mb-2 text-4xl font-extrabold wrap-anywhere max-sm:text-3xl">
          {post.title}
        </h1>

        {post.publishDate && (
          <p className="mb-3 text-lg wrap-anywhere opacity-70">
            {convertDateToMediumFormat(post.publishDate)}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col opacity-95">
          <MarkdownRenderer markdown={post.content} />
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
