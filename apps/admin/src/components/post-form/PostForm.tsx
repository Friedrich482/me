import { useState } from "react";
import { useForm } from "react-hook-form";

import { type CreatePost, CreatePostSchema } from "@/types-schemas";
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
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

import MarkdownEditor from "./MarkdownEditor";

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

  const [viewMode, setViewMode] = useState<"write" | "preview">("write");
  const handleWriteButtonClick = () => setViewMode("write");
  const handlePreviewButtonClick = () => setViewMode("preview");

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-3/4 flex-col items-center justify-center gap-6 max-lg:w-full"
      >
        <FormField
          control={form.control}
          name="post.title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Tags"
                  {...field}
                  className="border-border h-10 p-4 text-lg placeholder:text-lg placeholder:opacity-65 md:text-lg"
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
                  placeholder="Post Title"
                  {...field}
                  className="border-border h-10 p-4 text-lg placeholder:text-lg placeholder:opacity-65 md:text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="post.content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="dark:bg-input/30 flex min-h-[26.5rem] flex-col rounded-md bg-transparent">
                  <div className="relative flex h-[13%] items-center justify-start gap-4 p-2">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleWriteButtonClick}
                    >
                      Write
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handlePreviewButtonClick}
                    >
                      Preview
                    </Button>
                    <div
                      className={cn(
                        "bg-primary absolute bottom-0 h-1 w-8 rounded-md transition duration-200",
                        viewMode === "write" && "translate-x-4",
                        viewMode === "preview" && "translate-x-[6.5rem]",
                      )}
                    />
                  </div>
                  {viewMode === "write" ? (
                    <Textarea
                      placeholder="Start writing..."
                      className="field-sizing-fixed flex-1 rounded-t-none rounded-b-md border-0 text-lg placeholder:text-lg placeholder:opacity-65 focus-visible:border-none focus-visible:ring-0 md:text-lg"
                      {...field}
                    />
                  ) : (
                    <div className="bg-input/30 flex-1 rounded-t-none rounded-b-md border-0 p-4">
                      <MarkdownEditor markdown={field.value} />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="default"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="shadow-primary/50 h-11 w-32 self-start rounded-lg shadow-lg"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
