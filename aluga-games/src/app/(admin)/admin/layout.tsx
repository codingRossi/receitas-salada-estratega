import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AdminAuthError,
  ForbiddenAdminError,
  UnauthorizedAdminError,
} from "@/server/auth/auth-errors";
import { requireAdmin } from "@/server/auth/require-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof UnauthorizedAdminError) {
      redirect("/admin/login");
    }

    if (error instanceof ForbiddenAdminError) {
      redirect("/admin/unauthorized");
    }

    if (error instanceof AdminAuthError) {
      throw error;
    }

    throw error;
  }

  return <>{children}</>;
}
