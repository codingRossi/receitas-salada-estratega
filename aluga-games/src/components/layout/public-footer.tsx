import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { SiteContainer } from "@/components/layout/site-container";
import { publicNavigationLinks } from "@/components/layout/public-navigation";
import {
  buildStaticWhatsAppMessage,
  buildWhatsAppUrl,
  defaultWhatsAppMessages,
} from "@/domain/features/helpers";
import { clientEnv } from "@/lib/env";

const institutionalLinks = [
  {
    href: "/por-que-contratar",
    label: "Por que contratar",
  },
  {
    href: "/representante-alugagames",
    label: "Representante AlugaGames",
  },
];

export function PublicFooter() {
  const generalWhatsAppHref = buildWhatsAppUrl({
    phone: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: defaultWhatsAppMessages.general,
  });
  const workWithUsWhatsAppHref = buildWhatsAppUrl({
    phone: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: buildStaticWhatsAppMessage("workWithUs"),
  });

  return (
    <footer className="border-t border-border bg-white">
      <SiteContainer className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              aria-label="AlugaGames, início"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-sm font-black text-white"
              >
                AG
              </span>
              <span className="text-lg font-extrabold text-foreground">
                AlugaGames
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Soluções de entretenimento para eventos corporativos, festas,
              escolas, condomínios e ativações presenciais.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground">Navegação</h2>
            <nav aria-label="Links do rodapé" className="mt-4 grid gap-3">
              {publicNavigationLinks.slice(1, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground">Institucional</h2>
            <nav aria-label="Links institucionais" className="mt-4 grid gap-3">
              {institutionalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={workWithUsWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Trabalhe conosco
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground">Fale conosco</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Conte sobre seu evento e receba uma orientação consultiva para
              escolher as atrações.
            </p>
            <a
              href={generalWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <MessageCircle aria-hidden="true" size={17} />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} AlugaGames. Todos os direitos reservados.
        </div>
      </SiteContainer>
    </footer>
  );
}
