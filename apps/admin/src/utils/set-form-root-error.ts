import { type FieldValues, useForm } from "react-hook-form";

export const setFormRootError = <T extends FieldValues>(
  form: ReturnType<typeof useForm<T>>,
  errorMessage: string,
) => {
  form.setError("root", {
    message: errorMessage,
  });
};
