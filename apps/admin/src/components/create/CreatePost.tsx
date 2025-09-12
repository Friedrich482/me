import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import CreatePostForm from "@/components/create/CreatePostForm";
import usePageTitle from "@/hooks/usePageTitle";

const CreatePost = () => {
  usePageTitle("Create Post");

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-4/6 flex-col items-center justify-center gap-8 pt-2 max-md:w-5/6">
        <div className="flex w-3/4 flex-col gap-y-2 max-lg:w-full max-[18rem]:items-start">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span> Back to posts </span>
          </Link>

          <h1 className="w-full text-center text-4xl font-bold">Create Post</h1>
        </div>

        <CreatePostForm />
      </section>
    </main>
  );
};

export default CreatePost;
