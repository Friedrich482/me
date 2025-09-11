import { Pencil } from "lucide-react";

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
        <h1 className="flex w-full items-center justify-center gap-4 text-center text-4xl font-bold">
          <span>Edit</span> <Pencil />
        </h1>
        <EditPostForm post={post} tagsForPost={tagsForPost} />
      </section>
    </main>
  );
};

export default EditPost;
