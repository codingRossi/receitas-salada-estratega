import { AdminAuthProvider } from "@/components/layout/admin-auth-provider";

export default function AdminRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
