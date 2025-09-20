const TagsList = ({
  postTags,
}: {
  postTags: {
    name: string;
    slug: string;
  }[];
}) => (
  <ul className="flex flex-wrap items-center justify-start gap-3">
    {postTags.map((tag) => (
      <li
        key={tag.slug}
        className="dark:bg-muted/40 bg-muted/75 rounded-md px-2 py-1 text-lg"
      >
        <a href={`/blog#${tag.slug}`} className="size-full">
          {tag.name}
        </a>
      </li>
    ))}
  </ul>
);

export default TagsList;
