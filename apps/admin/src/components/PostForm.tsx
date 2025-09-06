import { useForm } from "react-hook-form";

import { type CreatePost, CreatePostSchema } from "@/types-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

const PostForm = () => {
  const form = useForm<CreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      post: {
        content: "",
        title: "",
        slug: "",
        status: "draft",
      },
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-dvh w-[clamp(30%,25rem,90%)] flex-col items-center justify-center gap-3"
      >
        <FormField
          control={form.control}
          name="post.title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Post Title*"
                  {...field}
                  className="border-border h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="post.title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type=""
                  placeholder="Post Content"
                  {...field}
                  className="border-border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PostForm;
