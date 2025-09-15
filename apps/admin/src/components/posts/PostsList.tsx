import { Link } from "react-router";
import { format } from "date-fns";
import { CircleSmall } from "lucide-react";

import type { Status } from "@/types-schemas";
import { useTRPC } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

const PostsList = ({ status }: { status: Status }) => {
  const trpc = useTRPC();

  const { data: posts } = useSuspenseQuery(
    trpc.posts.findAll.queryOptions({ status }),
  );

  return posts.length === 0 ? (
    <p className="text-xl">No posts yet.</p>
  ) : (
    <ul className="text-foreground/60 w-full space-y-8 text-lg">
      {posts.map((post) => (
        <li
          key={post.id}
          className="hover:text-primary/75 w-full cursor-pointer text-start"
        >
          <Link to={`/posts/${post.slug}`} className="flex gap-2">
            <CircleSmall className="shrink-0" />
            <div className="space-x-4">
              <span>{post.title}</span>
              <span className="opacity-50">
                {post.publishDate
                  ? format(post.publishDate, "MMM dd, yyyy")
                  : post.status === "draft" && status !== "draft"
                    ? "(draft)"
                    : ""}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
