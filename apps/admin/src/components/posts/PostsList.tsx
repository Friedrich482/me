import { useTRPC, type Inputs } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { CircleSmall } from "lucide-react";

const PostsList = () => {
  const trpc = useTRPC();
  const status: Inputs["posts"]["findAll"]["status"] = undefined;

  const { data: posts } = useSuspenseQuery(
    trpc.posts.findAll.queryOptions({ status })
  );

  return posts.length === 0 ? (
    <p className="text-xl">No posts yet.</p>
  ) : (
    <ul className="w-full text-foreground/60 space-y-8 text-[18px]">
      {posts.map((post) => (
        <li
          key={post.id}
          className="hover:text-primary/75 w-full cursor-pointer text-start text-[18px]"
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
