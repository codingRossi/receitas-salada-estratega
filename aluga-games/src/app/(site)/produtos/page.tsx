import type { Metadata } from "next";
import { PublicPageShell } from "@/components/site/public-page-shell";

export const metadata: Metadata = {
  title: "Atrações",
  description:
    "Atrações, games e experiências para eventos com atendimento consultivo da AlugaGames.",
};

export default function ProductsPage() {
  return (
    <PublicPageShell
      eyebrow="Atrações"
      title="Atrações para todos os tipos de evento"
      description="A base do catálogo público está preparada. A listagem real, busca e filtros serão conectados nas próximas tasks com dados publicados e seguros."
    />
  );
}
