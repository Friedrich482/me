import { Link } from "react-router";
import { Pencil } from "lucide-react";
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
      <section className="flex w-4/6 flex-col items-center justify-center gap-16 pt-2 max-md:w-5/6">
        <div className="flex w-3/4 flex-col gap-y-2 max-lg:w-full max-[18rem]:items-start">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span> Back to posts </span>
          </Link>

          <h1 className="flex items-center justify-center gap-4 self-center text-center text-4xl font-bold">
            <span>Edit</span> <Pencil />
          </h1>
        </div>
        <EditPostForm post={post} tagsForPost={tagsForPost} />
      </section>
    </main>
  );
};

export default EditPost;
