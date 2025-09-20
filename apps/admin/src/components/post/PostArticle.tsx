import { Link } from "react-router";
import { format } from "date-fns";

import usePageTitle from "@/hooks/usePageTitle";
import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import MarkdownEditor from "@repo/ui/components/MarkdownEditor";
import { useSuspenseQuery } from "@tanstack/react-query";

const PostArticle = () => {
  const { slug } = useSafeParams(ParamsSchema);
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
          <MarkdownEditor
            markdown={post.content}
            classNames={{ inlineCode: "dark:bg-muted/70 bg-muted" }}
          />
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

export default PostArticle;
