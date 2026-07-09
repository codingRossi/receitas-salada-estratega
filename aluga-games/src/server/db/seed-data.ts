import type { InferInsertModel } from "drizzle-orm";
import type {
  categories,
  faqs,
  landingPageBlocks,
  siteSettings,
  tags,
} from "@/server/db/schema";

type CategorySeed = InferInsertModel<typeof categories>;
type FaqSeed = InferInsertModel<typeof faqs>;
type LandingPageBlockSeed = InferInsertModel<typeof landingPageBlocks>;
type SiteSettingSeed = InferInsertModel<typeof siteSettings>;
type TagSeed = InferInsertModel<typeof tags>;

type SiteSettingsInput = {
  whatsappPhoneNumber: string | null;
};

export const initialCategories = [
  {
    name: "Games",
    slug: "games",
    description: "Atracoes interativas e jogos para eventos sociais e corporativos.",
    isActive: true,
  },
  {
    name: "Realidade virtual",
    slug: "realidade-virtual",
    description: "Experiencias imersivas para ativacoes e eventos premium.",
    isActive: true,
  },
  {
    name: "Inflaveis",
    slug: "inflaveis",
    description: "Opcoes recreativas para festas, escolas, condominios e eventos.",
    isActive: true,
  },
  {
    name: "Maquinas",
    slug: "maquinas",
    description: "Equipamentos de entretenimento e apoio para a experiencia do evento.",
    isActive: true,
  },
  {
    name: "Decoracao",
    slug: "decoracao",
    description: "Itens para compor ambientes e reforcar o tema do evento.",
    isActive: true,
  },
  {
    name: "Eventos corporativos",
    slug: "eventos-corporativos",
    description: "Solucoes para confraternizacoes, feiras e acoes de marca.",
    isActive: true,
  },
  {
    name: "Festas e aniversarios",
    slug: "festas-e-aniversarios",
    description: "Atracoes para celebracoes particulares com atendimento profissional.",
    isActive: true,
  },
] satisfies CategorySeed[];

export const initialTags = [
  {
    name: "infantil",
    slug: "infantil",
    type: "public",
    isActive: true,
  },
  {
    name: "adulto",
    slug: "adulto",
    type: "public",
    isActive: true,
  },
  {
    name: "corporativo",
    slug: "corporativo",
    type: "public",
    isActive: true,
  },
  {
    name: "escola",
    slug: "escola",
    type: "occasion",
    isActive: true,
  },
  {
    name: "condominio",
    slug: "condominio",
    type: "occasion",
    isActive: true,
  },
  {
    name: "evento premium",
    slug: "evento-premium",
    type: "feature",
    isActive: true,
  },
  {
    name: "mais procurado",
    slug: "mais-procurado",
    type: "feature",
    isActive: true,
  },
] satisfies TagSeed[];

export const initialLandingPageBlocks = [
  {
    key: "hero",
    type: "hero",
    title: "Locacao de atracoes para eventos memoraveis",
    subtitle: "AlugaGames",
    description:
      "Experiencias interativas, recreativas e corporativas com atendimento consultivo.",
    ctaLabel: "Solicitar atendimento",
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 10,
    isActive: true,
  },
  {
    key: "client_logos",
    type: "client_logos",
    title: "Clientes e eventos atendidos",
    subtitle: null,
    description:
      "Espaco reservado para logos validados e cadastrados pelo administrador.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 20,
    isActive: true,
  },
  {
    key: "why_choose_us",
    type: "why_choose_us",
    title: "Por que contratar a AlugaGames",
    subtitle: null,
    description:
      "Curadoria de atracoes, orientacao para o formato do evento e operacao profissional.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 30,
    isActive: true,
  },
  {
    key: "featured_products",
    type: "featured_products",
    title: "Atracoes em destaque",
    subtitle: null,
    description:
      "Bloco preparado para produtos destacados pelo administrador, sem preco publico.",
    ctaLabel: "Ver catalogo",
    ctaUrl: "/produtos",
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 40,
    isActive: true,
  },
  {
    key: "solutions",
    type: "solutions",
    title: "Solucoes para diferentes formatos de evento",
    subtitle: null,
    description:
      "Eventos corporativos, escolas, condominios, aniversarios e experiencias especiais.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 50,
    isActive: true,
  },
  {
    key: "how_it_works",
    type: "how_it_works",
    title: "Como funciona",
    subtitle: null,
    description:
      "O atendimento consultivo ajuda a selecionar atracoes adequadas ao publico e ao espaco.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 60,
    isActive: true,
  },
  {
    key: "testimonials",
    type: "testimonials",
    title: "Depoimentos",
    subtitle: null,
    description:
      "Bloco preparado para depoimentos reais cadastrados depois da validacao.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 70,
    isActive: true,
  },
  {
    key: "faq",
    type: "faq",
    title: "Perguntas frequentes",
    subtitle: null,
    description:
      "Respostas objetivas para orientar o primeiro contato pelo WhatsApp.",
    ctaLabel: null,
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 80,
    isActive: true,
  },
  {
    key: "final_cta",
    type: "final_cta",
    title: "Planeje sua experiencia com a AlugaGames",
    subtitle: null,
    description:
      "Fale com a equipe para receber uma orientacao adequada ao seu evento.",
    ctaLabel: "Falar no WhatsApp",
    ctaUrl: null,
    metadata: {
      seeded: true,
      version: 1,
    },
    position: 90,
    isActive: true,
  },
] satisfies LandingPageBlockSeed[];

export const initialFaqs = [
  {
    question: "A AlugaGames atende eventos corporativos?",
    answer:
      "Sim. A equipe orienta a escolha das atracoes conforme publico, espaco e objetivo do evento.",
    position: 10,
    isActive: true,
  },
  {
    question: "Os produtos exibem preco no site?",
    answer:
      "Nao. O atendimento e feito pelo WhatsApp para montar uma proposta adequada ao evento.",
    position: 20,
    isActive: true,
  },
  {
    question: "Como solicito uma proposta?",
    answer:
      "Use os botoes de WhatsApp do site e informe o tipo de evento, data, local e atracoes de interesse.",
    position: 30,
    isActive: true,
  },
  {
    question: "A montagem e a operacao sao combinadas antes do evento?",
    answer:
      "Sim. Os detalhes de montagem, operacao e necessidades do espaco sao alinhados no atendimento.",
    position: 40,
    isActive: true,
  },
] satisfies FaqSeed[];

export function createInitialSiteSettings({
  whatsappPhoneNumber,
}: SiteSettingsInput): SiteSettingSeed[] {
  return [
    {
      key: "whatsapp",
      value: {
        phone: whatsappPhoneNumber,
        defaultMessage:
          "Ola, vim pelo site da AlugaGames e gostaria de receber atendimento para um evento.",
        productMessageTemplate:
          "Ola, vim pelo site da AlugaGames e gostaria de saber mais sobre o produto: {{productName}}.",
        listMessageTemplate:
          "Ola, vim pelo site da AlugaGames e gostaria de saber mais sobre estes produtos: {{items}}.",
        workWithUsMessage:
          "Ola, vim pelo site da AlugaGames e gostaria de falar sobre oportunidades de trabalho.",
        representativeMessage:
          "Ola, vim pelo site da AlugaGames e gostaria de saber mais sobre representacao.",
        photographyMessage:
          "Ola, vim pelo site da AlugaGames e gostaria de saber mais sobre registros de eventos.",
      },
    },
    {
      key: "social_links",
      value: {
        instagram: null,
        facebook: null,
        linkedin: null,
        youtube: null,
      },
    },
    {
      key: "contact_info",
      value: {
        phone: null,
        email: null,
        address: null,
        city: null,
        state: null,
        serviceRegion: null,
      },
    },
    {
      key: "footer",
      value: {
        summary:
          "Locacao de atracoes e experiencias para eventos com atendimento consultivo.",
        workWithUsLabel: "Trabalhe conosco",
        workWithUsTarget: "whatsapp",
      },
    },
    {
      key: "seo_defaults",
      value: {
        title: "AlugaGames | Atracoes para eventos",
        description:
          "Atracoes interativas, recreativas e corporativas para eventos com atendimento profissional via WhatsApp.",
        ogImageUrl: null,
      },
    },
    {
      key: "site_identity",
      value: {
        siteName: "AlugaGames",
        tagline: "Atracoes para eventos memoraveis",
        logoUrl: null,
        faviconUrl: null,
      },
    },
  ];
}
