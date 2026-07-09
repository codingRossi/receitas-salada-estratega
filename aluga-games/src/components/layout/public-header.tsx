import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SiteContainer } from "@/components/layout/site-container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { publicNavigationLinks } from "@/components/layout/public-navigation";
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessages,
} from "@/domain/features/helpers";
import { clientEnv } from "@/lib/env";

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-sm font-black text-white shadow-sm shadow-brand/20"
    >
      AG
    </span>
  );
}

export function PublicHeader() {
  const whatsappHref = buildWhatsAppUrl({
    phone: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: defaultWhatsAppMessages.general,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
      <SiteContainer className="flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label="AlugaGames, início"
        >
          <LogoMark />
          <span className="leading-none">
            <span className="block text-base font-extrabold text-foreground">
              AlugaGames
            </span>
            <span className="mt-1 block text-xs font-medium text-muted-foreground">
              Eventos e atrações
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {publicNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-brand-soft hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:inline-flex"
          >
            <MessageCircle aria-hidden="true" size={17} />
            Solicitar proposta
          </a>
          <MobileNavigation
            links={publicNavigationLinks}
            whatsappHref={whatsappHref}
          />
        </div>
      </SiteContainer>
    </header>
  );
}
