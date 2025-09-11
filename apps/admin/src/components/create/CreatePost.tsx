import CreatePostForm from "@/components/create/CreatePostForm";
import usePageTitle from "@/hooks/usePageTitle";

const CreatePost = () => {
  usePageTitle("Create Post");

  return (
    <main className="flex flex-1 items-start justify-center py-2">
      <section className="flex w-4/6 flex-col items-center justify-center gap-8 pt-2 max-md:w-5/6">
        <h1 className="w-full text-center text-4xl font-bold">New Post</h1>
        <CreatePostForm />
      </section>
    </main>
  );
};

export default CreatePost;
