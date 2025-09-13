import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import usePageTitle from "@/hooks/usePageTitle";
import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

import EditPostForm from "./EditPostForm";

const EditPost = () => {
  const { slug } = useSafeParams(ParamsSchema);
  const trpc = useTRPC();

  const { data: post } = useSuspenseQuery(
    trpc.posts.findPost.queryOptions({ slug }),
  );
  const { data: tagsForPost } = useSuspenseQuery(
    trpc.tags.findAllTagsForPost.queryOptions({ postSlug: post.slug }),
  );

  usePageTitle(`Edit | ${post.title}`);

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-12 pt-8 max-xl:w-2/3">
        <div className="flex w-full flex-col gap-8">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span> Back to posts </span>
          </Link>

          <h1 className="w-full text-start text-4xl font-bold">Edit Post</h1>
        </div>

        <EditPostForm post={post} tagsForPost={tagsForPost} />
      </section>
    </main>
  );
};

export default EditPost;
