import type { RefObject } from "react";
import type { FieldValues, Path, PathValue, useForm } from "react-hook-form";

import setFormRootError from "@/utils/setFormRootError";
import { useTRPC } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";

const usePostContentFileDrop = <
  T extends FieldValues,
  TFieldName extends Path<T>,
  K extends HTMLTextAreaElement,
>(
  form: ReturnType<typeof useForm<T>>,
  name: TFieldName,
  formInputRef: RefObject<K | null>,
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
          const imageMarkdown = `[<img src="${data.url}" width="100%" style="display: block; margin: auto; " />](${data.url})`;

          const cursorPosition = formInputRef.current?.selectionStart || 0;
          const formInputValue = formInputRef.current?.value;
          const frontText = formInputValue?.slice(0, cursorPosition);
          const backText = formInputValue?.slice(cursorPosition);

          form.setValue(
            name,
            `${frontText}\n${imageMarkdown}\n${backText}` as PathValue<
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
