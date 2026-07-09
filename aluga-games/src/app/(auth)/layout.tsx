import { AdminAuthProvider } from "@/components/layout/admin-auth-provider";

export default function AuthRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
