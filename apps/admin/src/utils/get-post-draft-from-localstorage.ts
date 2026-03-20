import { LocalStoragePostDraftSchema } from "@/types-schemas";

export const getPostDraftFromLocalStorage = () => {
  const parsedPost = LocalStoragePostDraftSchema.safeParse(
    JSON.parse(localStorage.getItem("post-draft") || "{}"),
  );

  if (!parsedPost.success) {
    return { title: "", content: "", tags: [] };
  }

  return parsedPost.data;
};
