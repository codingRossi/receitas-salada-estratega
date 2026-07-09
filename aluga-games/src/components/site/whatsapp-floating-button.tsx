import { MessageCircle } from "lucide-react";
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessages,
} from "@/domain/features/helpers";
import { clientEnv } from "@/lib/env";

export function WhatsAppFloatingButton() {
  const whatsappHref = buildWhatsAppUrl({
    phone: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: defaultWhatsAppMessages.general,
  });

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar proposta pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden="true" size={26} />
    </a>
  );
}
