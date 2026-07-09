import { defaultWhatsAppMessages } from "../features/helpers";
import type {
  LandingPageBlock,
  LandingPageBlockType,
  LandingPageContent,
  LandingPageFaq,
  LandingPageGalleryItem,
  LandingPageItem,
} from "../entities/landing-page";

const blocks: Record<LandingPageBlockType, LandingPageBlock> = {
  hero: {
    key: "hero",
    type: "hero",
    title: "Experiências que conectam pessoas e fortalecem eventos.",
    subtitle: "Entretenimento para eventos em São Paulo",
    description:
      "Locação de brinquedos, games e atrações para eventos corporativos, ativações de marca, escolas, condomínios e celebrações especiais.",
    ctaLabel: "Solicitar proposta",
  },
  client_logos: {
    key: "client_logos",
    type: "client_logos",
    title: "Clientes e eventos atendidos",
    description:
      "Logos validados pelo admin serão exibidos aqui quando estiverem disponíveis.",
  },
  why_choose_us: {
    key: "why_choose_us",
    type: "why_choose_us",
    title: "Por que empresas escolhem a AlugaGames?",
    description:
      "Uma base profissional para transformar entretenimento em experiência de evento.",
  },
  featured_products: {
    key: "featured_products",
    type: "featured_products",
    title: "Atrações que elevam o seu evento",
    description:
      "Destaques cadastrados pelo admin aparecerão aqui quando houver produtos ativos.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos",
  },
  solutions: {
    key: "solutions",
    type: "solutions",
    title: "Soluções para diferentes formatos de evento",
    description:
      "Blocos editoriais para orientar o visitante por contexto e objetivo.",
  },
  how_it_works: {
    key: "how_it_works",
    type: "how_it_works",
    title: "Como funciona",
    description:
      "Um fluxo consultivo para entender o evento e indicar atrações adequadas.",
  },
  testimonials: {
    key: "testimonials",
    type: "testimonials",
    title: "Prova social validada",
    description:
      "Depoimentos reais serão exibidos depois de cadastrados e validados.",
  },
  faq: {
    key: "faq",
    type: "faq",
    title: "Dúvidas frequentes",
    description: "Respostas objetivas para orientar o primeiro contato.",
  },
  final_cta: {
    key: "final_cta",
    type: "final_cta",
    title: "Pronto para transformar seu evento em uma experiência marcante?",
    description:
      "Fale com a equipe da AlugaGames e receba uma orientação adequada ao seu público, espaço e objetivo.",
    ctaLabel: "Solicitar proposta",
  },
};

const whyChooseUs: LandingPageItem[] = [
  {
    title: "Operação completa",
    description:
      "A equipe orienta a escolha das atrações e prepara a montagem para o formato do evento.",
  },
  {
    title: "Atendimento consultivo",
    description:
      "O primeiro contato ajuda a entender público, espaço e objetivo antes da proposta.",
  },
  {
    title: "Atrações para engajamento",
    description:
      "Games, brinquedos e experiências interativas criam pontos de conexão no evento.",
  },
  {
    title: "Estrutura profissional",
    description:
      "Comunicação clara, organização e suporte para reduzir fricção na produção.",
  },
];

const solutions: LandingPageItem[] = [
  {
    title: "Eventos corporativos",
    description:
      "Atrações para confraternizações, feiras, ativações de marca e ações presenciais.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos?tag=corporativo",
  },
  {
    title: "Festas e aniversários",
    description:
      "Opções para celebrações com experiência organizada e atendimento profissional.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos?categoria=festas-e-aniversarios",
  },
  {
    title: "Realidade virtual",
    description:
      "Experiências imersivas para criar impacto, curiosidade e interação com o público.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos?categoria=realidade-virtual",
  },
  {
    title: "Infláveis e recreação",
    description:
      "Soluções recreativas para escolas, condomínios, festas e eventos com crianças.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos?categoria=inflaveis",
  },
  {
    title: "Games e experiências interativas",
    description:
      "Ativações com competição saudável, participação do público e momentos memoráveis.",
    ctaLabel: "Ver atrações",
    ctaUrl: "/produtos?categoria=games",
  },
];

const howItWorks: LandingPageItem[] = [
  {
    title: "Briefing",
    description:
      "Entendemos formato, público, espaço, data e objetivo do evento.",
  },
  {
    title: "Proposta personalizada",
    description:
      "A equipe indica atrações coerentes com a experiência que você quer criar.",
  },
  {
    title: "Montagem e operação",
    description:
      "O plano considera logística, preparação dos equipamentos e fluxo no evento.",
  },
  {
    title: "Suporte no evento",
    description:
      "A operação acompanha a experiência para manter clareza e organização.",
  },
];

const faqs: LandingPageFaq[] = [
  {
    question: "A AlugaGames atende eventos corporativos?",
    answer:
      "Sim. A equipe orienta a escolha das atrações conforme público, espaço e objetivo do evento.",
  },
  {
    question: "Como solicito uma proposta?",
    answer:
      "Use os botões de WhatsApp do site e informe tipo de evento, data, local e atrações de interesse.",
  },
  {
    question: "A montagem é alinhada antes do evento?",
    answer:
      "Sim. Os detalhes de montagem, operação e necessidades do espaço são combinados durante o atendimento.",
  },
  {
    question: "É possível atender escolas e condomínios?",
    answer:
      "Sim. O atendimento considera o perfil do público e o contexto do espaço para indicar opções adequadas.",
  },
];

const galleryItems: LandingPageGalleryItem[] = [
  {
    title: "Ativações de marca",
    subtitle: "Interação e permanência do público",
  },
  {
    title: "Eventos corporativos",
    subtitle: "Experiências para equipes e convidados",
  },
  {
    title: "Escolas e condomínios",
    subtitle: "Atrações com organização e suporte",
  },
];

export const fallbackLandingPageContent: LandingPageContent = {
  blocks,
  blockItems: {
    why_choose_us: whyChooseUs,
    solutions,
    how_it_works: howItWorks,
  },
  featuredProducts: [],
  clientLogos: [],
  testimonials: [],
  faqs,
  galleryItems,
  whatsapp: {
    phone: null,
    message: defaultWhatsAppMessages.general,
  },
};
