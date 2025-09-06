import { Pencil } from "lucide-react";

import usePageTitle from "@/hooks/usePageTitle";
import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

const EditPost = () => {
  const { slug } = useSafeParams(ParamsSchema);
  const trpc = useTRPC();

  const { data: post } = useSuspenseQuery(
    trpc.posts.findPost.queryOptions({ slug }),
  );

  usePageTitle(`Edit | ${post.title}`);

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-3/6 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
        <h1 className="flex w-full items-center justify-start gap-2 text-start text-4xl font-bold">
          Edit <Pencil />
        </h1>
        {post.content}
      </section>
    </main>
  );
};

export default EditPost;
