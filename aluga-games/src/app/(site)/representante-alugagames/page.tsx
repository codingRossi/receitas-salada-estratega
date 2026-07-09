import type { Metadata } from "next";
import { PublicPageShell } from "@/components/site/public-page-shell";

export const metadata: Metadata = {
  title: "Representante AlugaGames",
  description:
    "Página institucional para contato sobre representação AlugaGames.",
};

export default function RepresentativePage() {
  return (
    <PublicPageShell
      eyebrow="Representante AlugaGames"
      title="Representação com padrão profissional"
      description="Este espaço institucional está preparado para a página estática de representante, com contato direto pelo WhatsApp e sem formulário próprio."
    />
  );
}
