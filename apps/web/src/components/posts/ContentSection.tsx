const ContentSection = ({ post }: { post: any }) => {
  return (
    <section className="flex w-3/6 flex-col items-center justify-center gap-16 pt-8 max-md:w-5/6">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </section>
  );
};

export default ContentSection;
