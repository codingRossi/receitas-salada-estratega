import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { SiteContainer } from "@/components/layout/site-container";
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessages,
} from "@/domain/features/helpers";
import { clientEnv } from "@/lib/env";

type PublicPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
}: PublicPageShellProps) {
  const whatsappHref = buildWhatsAppUrl({
    phone: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: defaultWhatsAppMessages.general,
  });

  return (
    <section className="bg-background-soft py-16 sm:py-20">
      <SiteContainer>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-brand-dark">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Solicitar proposta
            </a>
            <Link
              href="/produtos"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand/25 bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:border-brand hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Ver atrações
            </Link>
          </div>
        </div>

        {children ? <div className="mt-12">{children}</div> : null}
      </SiteContainer>
    </section>
  );
}
