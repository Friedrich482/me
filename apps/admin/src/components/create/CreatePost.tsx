import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import CreatePostForm from "@/components/create/CreatePostForm";
import usePageTitle from "@/hooks/usePageTitle";

const CreatePost = () => {
  usePageTitle("Create Post");

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-1/2 flex-col items-center justify-center gap-12 pt-8 max-xl:w-2/3 max-sm:w-[90%]">
        <div className="flex w-full flex-col gap-8">
          <Link
            to="/posts"
            className="hover:text-primary flex items-center justify-start gap-1 text-base opacity-60 hover:underline"
          >
            <ArrowLeft size={16} />
            <span> Back to posts </span>
          </Link>

          <h1 className="w-full text-start text-4xl font-bold">Create Post</h1>
        </div>

        <CreatePostForm />
      </section>
    </main>
  );
};

export default CreatePost;
