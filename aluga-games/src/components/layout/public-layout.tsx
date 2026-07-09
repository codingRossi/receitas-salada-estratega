import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppFloatingButton } from "@/components/site/whatsapp-floating-button";

export function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main id="conteudo-principal">{children}</main>
      <PublicFooter />
      <WhatsAppFloatingButton />
    </div>
  );
}
