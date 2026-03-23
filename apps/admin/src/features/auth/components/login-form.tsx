import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { setFormRootError } from "@/utils/set-form-root-error";
import { useTRPC } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInUser, SignInUserSchema } from "@repo/common/types-schemas";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTogglePassword } from "../hooks/use-toggle-password";

export const LoginForm = () => {
  const form = useForm<SignInUser>({
    resolver: zodResolver(SignInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPasswordVisible, EyeIconComponent } = useTogglePassword();

  const navigate = useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const loginMutation = useMutation(trpc.auth.signIn.mutationOptions());

  const onSubmit = async (values: SignInUser) => {
    loginMutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const errorMessage = error.message;
          if (
            errorMessage.toLowerCase().includes("email") ||
            errorMessage.toLowerCase().includes("user")
          ) {
            form.setError("email", { message: errorMessage });
          } else if (errorMessage.includes("password")) {
            form.setError("password", { message: errorMessage });
          } else {
            setFormRootError(form, errorMessage);
          }
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: trpc.auth.getUser.queryKey(),
            exact: true,
          });

          navigate("/");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-dvh w-[clamp(30%,25rem,90%)] flex-col items-center justify-center gap-10 p-2 pt-10"
      >
        <h2 className="flex flex-col items-center justify-center gap-8 text-center text-3xl font-extrabold max-[42.5rem]:text-2xl">
          Login
        </h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
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
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <div className="relative flex items-center justify-end gap-2">
                <FormControl>
                  <Input
                    placeholder="**********"
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                    className="border-border h-10 flex-nowrap"
                  />
                </FormControl>
                <EyeIconComponent />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-10 w-1/2 self-center rounded-lg"
        >
          Log in
        </Button>
        <div className="place-self-start">
          {form.formState.errors.root && (
            <FormMessage className="text-lg">
              {form.formState.errors.root.message}
            </FormMessage>
          )}
        </div>
      </form>
    </Form>
  );
};
