import { LoginForm } from "@/features/auth/components/login-form";
import { usePageTitle } from "@/hooks/use-page-title";

export const Login = () => {
  usePageTitle("Login | Admin Blog");

  return (
    <main className="flex items-center justify-center gap-2">
      <LoginForm />
    </main>
  );
};
