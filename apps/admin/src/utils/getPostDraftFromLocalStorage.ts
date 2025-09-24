import { LocalStoragePostDraftSchema } from "@/types-schemas";

const getPostDraftFromLocalStorage = () => {
  const parsedPost = LocalStoragePostDraftSchema.safeParse(
    JSON.parse(localStorage.getItem("post-draft") || "{}"),
  );

  if (!parsedPost.success) {
    return { title: "", content: "", tags: [] };
  }

  return parsedPost.data;
};

export default getPostDraftFromLocalStorage;
