import { useState } from "react";
import { type FieldValues, type Path, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Info } from "lucide-react";

import usePostContentFileDrop from "@/hooks/usePostContentFileDrop";
import MarkdownEditor from "@repo/ui/components/markdown/MarkdownEditor";
import { Button } from "@repo/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

const ContentField = <T extends FieldValues, TFieldName extends Path<T>>({
  form,
  name,
}: {
  form: ReturnType<typeof useForm<T>>;
  name: TFieldName;
}) => {
  const [viewMode, setViewMode] = useState<"write" | "preview">("write");
  const handleWriteButtonClick = () => setViewMode("write");
  const handlePreviewButtonClick = () => setViewMode("preview");

  const { handleDrop, isPending } = usePostContentFileDrop(form, name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="bg-muted/30 flex min-h-120 flex-col rounded-md">
              <div className="relative flex h-16 items-center justify-start gap-4 p-2">
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
                    viewMode === "preview" && "translate-x-26",
                  )}
                />
              </div>
              {viewMode === "write" ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex-1 rounded-t-none rounded-b-md border-0"
                >
                  <Textarea
                    placeholder="Start writing..."
                    className="field-sizing-fixed size-full flex-1 rounded-t-none rounded-b-none border-0 text-lg placeholder:text-lg placeholder:opacity-65 focus-visible:border-none focus-visible:ring-0 md:text-lg"
                    {...field}
                  />
                </div>
              ) : (
                <div className="bg-muted/30 flex-1 rounded-t-none border-0 p-4">
                  <MarkdownEditor markdown={field.value} />
                </div>
              )}
              <div
                id="content-drop-hint"
                role="status"
                aria-live="polite"
                className="flex h-10 translate-x-2 items-center justify-start gap-1 p-1 opacity-50"
              >
                {isPending ? (
                  <>
                    <ClipLoader color="#c4c4c4" size={20} />
                    <span>Uploading image...</span>
                  </>
                ) : (
                  <>
                    <Info size={20} />
                    <span>You can drag and drop images</span>
                  </>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentField;
