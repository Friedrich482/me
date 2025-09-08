import { Link } from "react-router";
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
          className="hover:text-primary/75 w-full cursor-pointer text-start text-lg"
        >
          <Link to={`/posts/${post.slug}`} className="flex gap-2">
            <CircleSmall />
            <span>{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
