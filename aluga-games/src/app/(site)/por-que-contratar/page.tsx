import type { Metadata } from "next";
import { PublicPageShell } from "@/components/site/public-page-shell";

export const metadata: Metadata = {
  title: "Por que contratar",
  description:
    "Diferenciais da AlugaGames para eventos, ativações e experiências presenciais.",
};

export default function WhyHirePage() {
  return (
    <PublicPageShell
      eyebrow="Por que contratar"
      title="Estrutura, experiência e atendimento consultivo"
      description="A página institucional está preparada para apresentar diferenciais da AlugaGames com linguagem premium, foco em confiança e CTA para WhatsApp."
    />
  );
}
