import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acesso negado",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminUnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Acesso negado.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          O usuario autenticado nao esta autorizado para acessar esta area.
        </p>
        <Link
          href="/admin/login"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background"
        >
          Voltar ao acesso
        </Link>
      </section>
    </main>
  );
}
