import { useState } from "react";
import { useForm } from "react-hook-form";

import type { CreatePost } from "@/types-schemas";
import { Button } from "@repo/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

import MarkdownEditor from "./MarkdownEditor";

const ContentField = ({
  form,
}: {
  form: ReturnType<typeof useForm<CreatePost>>;
}) => {
  const [viewMode, setViewMode] = useState<"write" | "preview">("write");
  const handleWriteButtonClick = () => setViewMode("write");
  const handlePreviewButtonClick = () => setViewMode("preview");

  return (
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
  );
};

export default ContentField;
