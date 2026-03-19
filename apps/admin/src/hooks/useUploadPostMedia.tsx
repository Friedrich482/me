import type { RefObject } from "react";
import type { FieldValues, Path, PathValue, useForm } from "react-hook-form";

import setFormRootError from "@/utils/setFormRootError";
import { type Outputs, useTRPC } from "@/utils/trpc";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";

type UploadMedia<T extends FieldValues, TFieldName extends Path<T>> = {
  files: File[];
  form: ReturnType<typeof useForm<T>>;
  name: TFieldName;
  formInputRef: RefObject<HTMLTextAreaElement | null>;
  createMediaMutation: UseMutationResult<
    Outputs["media"]["create"],
    TRPCClientErrorLike<{
      input: FormData;
      output: Outputs["media"]["create"];
      transformer: true;
      errorShape: DefaultErrorShape;
      featureFlags: {
        keyPrefix: false;
      };
    }>,
    FormData,
    undefined
  >;
};

const uploadImages = async <T extends FieldValues, TFieldName extends Path<T>>({
  files,
  form,
  name,
  formInputRef,
  createMediaMutation,
}: UploadMedia<T, TFieldName>) => {
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
        const imageMarkdown = `[<img src="${data.url}" width="100%" style="display: block; margin: auto;" />](${data.url})`;

        const cursorPosition = formInputRef.current?.selectionStart || 0;
        const formInputValue = formInputRef.current?.value ?? "";
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

const useUploadPostMedia = <T extends FieldValues, TFieldName extends Path<T>>(
  form: ReturnType<typeof useForm<T>>,
  name: TFieldName,
  formInputRef: RefObject<HTMLTextAreaElement | null>,
) => {
  const trpc = useTRPC();
  const createMediaMutation = useMutation(trpc.media.create.mutationOptions());

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer?.files || []);
    await uploadImages({
      files,
      form,
      formInputRef,
      createMediaMutation,
      name,
    });
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const files = Array.from(e.target?.files || []);
    await uploadImages({
      files,
      form,
      formInputRef,
      createMediaMutation,
      name,
    });
  };

  return {
    handleDrop,
    handleFileInputChange,
    isPending: createMediaMutation.isPending,
  };
};

export default useUploadPostMedia;
