import type { KeyboardEvent, RefObject } from "react";
import type { Path, PathValue, useForm } from "react-hook-form";

export const handleTabKey = <
  T extends { post: { content: string } },
  TFieldName extends Exclude<Path<T>, "post">,
>(
  e: KeyboardEvent<HTMLTextAreaElement>,
  form: ReturnType<typeof useForm<T>>,
  name: TFieldName,
  textAreaRef: RefObject<HTMLTextAreaElement | null>,
) => {
  if (e.key !== "Tab") {
    return;
  }

  e.preventDefault();

  const NUMBER_OF_SPACES = 4;
  const formInputValue = form.getValues(name);

  const cursorPosition = textAreaRef.current?.selectionStart ?? 0;
  const frontText = formInputValue.slice(0, cursorPosition);
  const backText = formInputValue.slice(cursorPosition);
  const padText = Array<string>(NUMBER_OF_SPACES).fill(" ").join("");

  form.setValue(
    name,
    `${frontText}${padText}${backText}` as PathValue<T, TFieldName>,
  );

  if (!textAreaRef.current) {
    return;
  }

  // move the cursor add the end of the `padText`
  textAreaRef.current.selectionStart = form
    .getValues(name)
    .lastIndexOf(backText);

  textAreaRef.current.selectionEnd = form.getValues(name).lastIndexOf(backText);
};
