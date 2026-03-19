import { useRef, useState } from "react";
import { type FieldValues, type Path, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Image } from "lucide-react";

import useUploadPostMedia from "@/hooks/useUploadPostMedia";
import MarkdownEditor from "@repo/ui/components/markdown/MarkdownEditor";
import { Button } from "@repo/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
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

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref } = form.register(name);

  const imageUploadInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageButtonClick = () => {
    imageUploadInputRef.current?.click();
  };

  const { isPending, handleDrop, handleFileInputChange } = useUploadPostMedia(
    form,
    name,
    textAreaRef,
  );

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
                  className="flex-1 border-y px-0 py-3"
                >
                  <Textarea
                    placeholder="Start writing..."
                    className="field-sizing-fixed size-full flex-1 rounded-t-none rounded-b-none border-0 bg-transparent text-lg placeholder:text-lg placeholder:opacity-65 focus-visible:border-none focus-visible:ring-0 md:text-lg"
                    {...field}
                    ref={(e) => {
                      ref(e);
                      textAreaRef.current = e;
                    }}
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
                className="flex h-10 translate-x-2 items-center justify-start gap-1 px-1 py-6 opacity-50"
              >
                {isPending ? (
                  <>
                    <ClipLoader color="#c4c4c4" size={20} />
                    <span>Uploading image...</span>
                  </>
                ) : (
                  <>
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      aria-label="Upload image"
                      onClick={handleImageButtonClick}
                    >
                      <Image />
                    </Button>
                    <Input
                      type="file"
                      onChange={handleFileInputChange}
                      ref={imageUploadInputRef}
                      accept="image/*"
                      className="hidden"
                    />
                    <span>or drag and drop images</span>
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
