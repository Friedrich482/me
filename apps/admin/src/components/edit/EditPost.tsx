import useSafeParams from "@/hooks/useSafeParams";
import { ParamsSchema } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";

const EditPost = () => {
  const { slug } = useSafeParams(ParamsSchema);
  const trpc = useTRPC();

  const { data: post } = useSuspenseQuery(
    trpc.posts.findPost.queryOptions({ slug })
  );

  return (
    <main className="flex-1 flex items-start justify-center py-2">
      <section className="flex w-3/6 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
        <h1 className="text-4xl font-bold text-start w-full flex items-center justify-start gap-2">
          Edit <Pencil />
        </h1>
        {post.content}
      </section>
    </main>
  );
};

export default EditPost;
