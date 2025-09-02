import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const PostSection = () => {
  const { slug } = useSafeParams(ParamsSchema);
  const trpc = useTRPC();

  const { data: post } = useSuspenseQuery(
    trpc.posts.findPost.queryOptions({ slug })
  );

  return (
    <section className="flex w-1/2 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <p className="opacity-40">
            {post.publishDate && format(post.publishDate, "MMM dd, yyyy")}
          </p>
        </div>

        <article className="w-full text-[18px] opacity-75">
          {post.content}
        </article>
      </div>
    </section>
  );
};

export default PostSection;
