import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Plus, X } from "lucide-react";

import ContentField from "@/components/common/ContentField";
import { useDebounce } from "@/hooks/useDebounce";
import { type CreatePost, CreatePostSchema } from "@/types-schemas";
import getPostDraftFromLocalStorage from "@/utils/getPostDraftFromLocalStorage";
import setFormRootError from "@/utils/setFormRootError";
import { useTRPC } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import generateSlug from "@repo/common/generateSlug";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatePostForm = () => {
  const postDraft = getPostDraftFromLocalStorage();

  const form = useForm<CreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      post: {
        content: postDraft.content,
        title: postDraft.title,
        status: "draft",
      },
      tags: postDraft.tags,
    },
  });

  const {
    fields: tags,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "tags",
    rules: { maxLength: 5 },
  });

  const debouncedPost = useDebounce(
    {
      title: form.watch().post.title,
      content: form.watch().post.content,
      tags: form.watch().tags,
    },
    1000,
  );

  useEffect(() => {
    localStorage.setItem("post-draft", JSON.stringify(debouncedPost));
  }, [debouncedPost]);

  const navigate = useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(trpc.posts.create.mutationOptions());
  const addTagToPostMutation = useMutation(
    trpc.tags.addTagToPost.mutationOptions(),
  );

  const onSubmit = async (values: CreatePost) => {
    createPostMutation.mutate(
      {
        title: values.post.title,
        slug: generateSlug(values.post.title),
        content: values.post.content,
        status: values.post.status,
      },
      {
        onError: (error) => {
          const errorMessage = error.message;
          if (errorMessage.toLowerCase().includes("slug")) {
            form.setError("post.title", {
              message: `${errorMessage}. It means that this title is already taken`,
            });
          } else {
            setFormRootError(form, errorMessage);
          }
        },

        onSuccess: async ({ id }) => {
          // invalidate posts
          await queryClient.invalidateQueries({
            queryKey: trpc.posts.findAll.queryKey(),
            exact: true,
          });

          // add all tags to the post
          const tagPromises = values.tags.map((tag, index) =>
            addTagToPostMutation.mutateAsync(
              {
                name: tag.name,
                slug: generateSlug(tag.name),
                postId: id,
              },
              {
                onError: (error) => {
                  const errorMessage = error.message;
                  if (errorMessage.toLowerCase().includes("tag")) {
                    form.setError(`tags.${index}`, { message: errorMessage });
                  } else {
                    setFormRootError(form, errorMessage);
                  }
                },
                onSuccess: async () => {
                  await queryClient.invalidateQueries({
                    queryKey: trpc.tags.findAllTagsForPost.queryKey(),
                    exact: true,
                  });

                  navigate("/posts");
                },
              },
            ),
          );

          await Promise.allSettled(tagPromises);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <FormField
          control={form.control}
          name="post.title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="border-border h-10 p-4 text-lg placeholder:text-lg placeholder:opacity-65 md:text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex min-h-44 w-full flex-col gap-2 rounded-md border px-2 py-4">
          <ul className="grid h-4/5 flex-1 grid-cols-3 gap-3">
            {tags.map((tag, index) => (
              <div className="relative" key={tag.id}>
                <Input
                  className="border-border p-4 text-start text-lg placeholder:text-lg placeholder:opacity-65 md:text-lg"
                  key={tag.id}
                  {...form.register(`tags.${index}.name`)}
                />
                <Button
                  className="absolute -top-3 right-1 size-5"
                  size="icon"
                  title={`Remove the tag ${form.watch(`tags.${index}`).name}`}
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </ul>
          <Button
            type="button"
            onClick={() => append({ name: "" })}
            className="flex items-center justify-center gap-3 self-center"
          >
            <span>Add a tag</span>
            <Plus />
          </Button>
        </div>

        <ContentField form={form} name="post.content" />

        <Button
          variant="default"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="shadow-primary/50 h-11 w-32 self-start rounded-lg shadow-lg"
        >
          Create
        </Button>
        <div className="place-self-start">
          {form.formState.errors.root && (
            <FormMessage className="text-lg">
              {form.formState.errors.root.message}
            </FormMessage>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
