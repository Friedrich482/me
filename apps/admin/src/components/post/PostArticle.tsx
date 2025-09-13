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
          classNames={{ p: "opacity-40" }}
        />
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col opacity-85">
          <MarkdownEditor
            markdown={post.content}
            classNames={{ inlineCode: "bg-input/70" }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3">
          {postTags.map((tag) => (
            <Link
              key={tag.slug}
              className="bg-input/40 rounded-md px-2 py-1 text-lg"
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
