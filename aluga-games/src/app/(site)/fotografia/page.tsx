import type { Metadata } from "next";
import { PublicPageShell } from "@/components/site/public-page-shell";

export const metadata: Metadata = {
  title: "Fotografia",
  description:
    "Registros visuais de eventos, atrações e experiências da AlugaGames.",
};

export default function PhotographyPage() {
  return (
    <PublicPageShell
      eyebrow="Fotografia"
      title="Eventos, atrações e experiências reais"
      description="A página de fotografia está preparada para receber álbuns e registros validados da AlugaGames, sem tratar fotografia como serviço separado."
    />
  );
}
