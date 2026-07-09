import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acesso administrativo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <SignIn
        path="/admin/login"
        routing="path"
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            cardBox: "shadow-sm",
          },
        }}
      />
    </main>
  );
}
