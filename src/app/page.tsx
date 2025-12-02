import AuthGuard from "@/components/auth-guard";

export default function page() {
  return <AuthGuard />;
}
