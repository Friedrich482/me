import { useTRPC, type Inputs } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

const PostsList = () => {
  const trpc = useTRPC();
  const status: Inputs["posts"]["findAll"]["status"] = undefined;

  const { data: posts } = useSuspenseQuery(
    trpc.posts.findAll.queryOptions({ status })
  );

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostsList;
