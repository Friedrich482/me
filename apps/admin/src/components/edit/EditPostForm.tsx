import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import ContentField from "@/components/common/ContentField";
import { type EditPost, EditPostSchema } from "@/types-schemas";
import generateSlug from "@/utils/generateSlug";
import setFormRootError from "@/utils/setFormRootError";
import { type Outputs, useTRPC } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
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

const EditPostForm = ({
  post,
  tagsForPost,
}: {
  post: Outputs["posts"]["findPost"];
  tagsForPost: Outputs["tags"]["findAllTagsForPost"];
}) => {
  const form = useForm<EditPost>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      post: {
        content: post.content,
        title: post.title,
        status: post.status || "draft",
        publishedAt: null,
      },
      tags: tagsForPost,
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

  const navigate = useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const editPostMutation = useMutation(trpc.posts.update.mutationOptions());
  const addTagToPostMutation = useMutation(
    trpc.tags.addTagToPost.mutationOptions(),
  );
  const removeTagFromPostMutation = useMutation(
    trpc.tags.removeTagFromPost.mutationOptions(),
  );

  const onEdit = async (values: EditPost) => {
    editPostMutation.mutate(
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

        onSuccess: async ({ id, slug }) => {
          // invalidate posts
          await queryClient.invalidateQueries({
            queryKey: trpc.posts.findAll.queryKey(),
            exact: true,
          });

          const newAddedTags = values.tags.filter(
            (tag) => !tagsForPost.find((entry) => entry.name === tag.name),
          );
          const deletedTags = tagsForPost.filter(
            (tag) => !values.tags.find((entry) => entry.name === tag.name),
          );

          // add all new tags to the post
          const newAddedTagsPromises = newAddedTags.map((tag, index) =>
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

                  toast("Saved");
                },
              },
            ),
          );

          // delete all removed tags
          const deletedTagsPromises = deletedTags.map((tag, index) =>
            removeTagFromPostMutation.mutateAsync(
              {
                tagSlug: generateSlug(tag.name),
                postSlug: slug,
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

                  toast("Saved");
                },
              },
            ),
          );

          await Promise.allSettled([
            ...newAddedTagsPromises,
            ...deletedTagsPromises,
          ]);
        },
      },
    );
  };

  const onSubmit = async (values: EditPost) => {
    await onEdit(values);

    editPostMutation.mutate(
      {
        title: values.post.title,
        slug: generateSlug(values.post.title),
        content: values.post.content,
        status: "published",
        publishedAt: new Date().toISOString(),
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

        onSuccess: async () => {
          navigate("/posts");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="flex w-full flex-col items-center justify-center gap-6">
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

        <div className="flex w-full items-center justify-between">
          <Button
            variant="outline"
            type="submit"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onEdit)}
            className="shadow-primary/50 h-11 w-32 self-start rounded-lg shadow-lg"
          >
            Save
          </Button>
          <Button
            variant="default"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="shadow-primary/50 h-11 w-32 self-end rounded-lg shadow-lg"
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPostForm;
