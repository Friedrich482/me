import type { FieldValues, Path, PathValue, useForm } from "react-hook-form";

import setFormRootError from "@/utils/setFormRootError";
import { useTRPC } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";

const usePostContentFileDrop = <
  T extends FieldValues,
  TFieldName extends Path<T>,
>(
  form: ReturnType<typeof useForm<T>>,
  name: TFieldName,
) => {
  const trpc = useTRPC();
  const createMediaMutation = useMutation(trpc.media.create.mutationOptions());

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || []);
    const images = files.filter((file) => file.type.startsWith("image/"));

    if (images.length === 0) {
      setFormRootError(form, "Only images are allowed!");
      return;
    }

    const mediaMutationPromises = images.map((image) => {
      const formData = new FormData();

      formData.append("file", image);
      formData.append("postId", JSON.stringify(null));

      return createMediaMutation.mutateAsync(formData, {
        onError: (error) => {
          const errorMessage = error.message;
          setFormRootError(form, errorMessage);
        },
        onSuccess: (data) => {
          const imageMarkdown = `[<img src="${data.url}" width="50%" style="display: block; margin: auto; " />](${data.url})`;

          form.setValue(
            name,
            `${form.getValues(name)}\n\n${imageMarkdown}` as PathValue<
              T,
              TFieldName
            >,
          );

          form.clearErrors();
        },
      });
    });

    await Promise.allSettled(mediaMutationPromises);
  };

  return { handleDrop, isPending: createMediaMutation.isPending };
};

export default usePostContentFileDrop;
