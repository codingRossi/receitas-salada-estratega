/**
 * Helpers puros para transformar dados públicos da landing page.
 *
 * Este arquivo não executa queries. Ele existe para concentrar normalização,
 * fallbacks e pequenos helpers usados pelas features de landing/WhatsApp.
 */

import type {
  LandingPageBlock,
  LandingPageBlockType,
  LandingPageContent,
  LandingPageData,
  LandingPageDataSource,
  LandingPageGalleryItem,
  LandingPageItem,
  LandingPageLogo,
  LandingPageProduct,
} from "../entities/landing-page";
import type {
  LandingPageBlockItemRow,
  LandingPageBlockRow,
  LandingPageClientLogoRow,
  LandingPageFaqRow,
  LandingPageFeaturedProductRow,
  LandingPageGalleryPreviewRow,
  LandingPageSiteSettingRow,
  LandingPageTestimonialRow,
} from "../contracts/landing-page-repositories";

export function hasConfiguredDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function mapLandingPageBlockRowsToIds(
  blockRows: LandingPageBlockRow[],
): string[] {
  return blockRows.map((blockRow) => blockRow.id);
}

const publicLandingPageBlockTypes = [
  "hero",
  "client_logos",
  "why_choose_us",
  "featured_products",
  "solutions",
  "how_it_works",
  "testimonials",
  "faq",
  "final_cta",
] as const satisfies readonly LandingPageBlockType[];

const publicLandingPageBlockTypeSet = new Set<string>(
  publicLandingPageBlockTypes,
);

const DEFAULT_FEATURED_PRODUCT_SHORT_DESCRIPTION =
  "Atração cadastrada para compor experiências em eventos.";

type MaybePublicLandingPageLogo = Omit<LandingPageLogo, "imageUrl"> & {
  imageUrl?: string;
};

export const defaultWhatsAppMessages = {
  general:
    "Olá, vim pelo site da AlugaGames e gostaria de solicitar uma proposta para o meu evento.",
  workWithUs:
    "Olá, vim pelo site da AlugaGames e tenho interesse em trabalhar com vocês.",
  representative:
    "Olá, vim pelo site da AlugaGames e gostaria de saber mais sobre representação.",
  photography:
    "Olá, vim pelo site da AlugaGames e vi os registros de eventos. Gostaria de saber mais sobre atrações para o meu evento.",
} as const;

/**
 * Monta a URL pública do WhatsApp usada nos CTAs do site.
 *
 * O telefone pode ser nulo porque ambientes sem configuração ainda precisam
 * abrir o WhatsApp com a mensagem preenchida, sem quebrar a landing page.
 */
export function buildWhatsAppUrl(input: {
  message: string;
  phone?: string | null;
}): string {
  const sanitizedPhone = sanitizeWhatsAppPhone(input.phone);
  const encodedMessage = encodeURIComponent(input.message);

  if (!sanitizedPhone) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;
}

/**
 * Retorna mensagens estáticas versionadas no código para fluxos públicos que
 * ainda não dependem do CMS.
 */
export function buildStaticWhatsAppMessage(
  type: keyof typeof defaultWhatsAppMessages,
): string {
  return defaultWhatsAppMessages[type];
}

/**
 * Identifica explicitamente quando a landing page foi montada com conteúdo de
 * fallback. O `source` aparece no DTO para facilitar debug sem expor erro ao
 * visitante.
 */
export function buildLandingPageFallbackData(input: {
  fallbackContent: LandingPageContent;
  source: LandingPageDataSource;
}): LandingPageData {
  return {
    ...input.fallbackContent,
    source: input.source,
  };
}

/**
 * Garante que apenas blocos públicos conhecidos sejam expostos na landing page.
 *
 * Blocos administrativos podem existir no banco antes de o frontend ter suporte
 * visual; ignorá-los evita vazamento de conteúdo sem layout validado.
 */
export function isPublicLandingPageBlockType(
  type: string,
): type is LandingPageBlockType {
  return publicLandingPageBlockTypeSet.has(type);
}

/**
 * Converte rows vindas dos repositories no DTO público da landing page.
 *
 * O fallback é aplicado por seção, não apenas no erro geral, para manter a home
 * publicável mesmo quando uma coleção editável ainda estiver vazia.
 */
export function buildPublicLandingPageContent(input: {
  activeLandingPageBlockRows: LandingPageBlockRow[];
  activeBlockItemRows: LandingPageBlockItemRow[];
  activeClientLogoRows: LandingPageClientLogoRow[];
  activeFaqRows: LandingPageFaqRow[];
  activeTestimonialRows: LandingPageTestimonialRow[];
  fallbackContent: LandingPageContent;
  featuredProductRows: LandingPageFeaturedProductRow[];
  galleryPreviewRows: LandingPageGalleryPreviewRow[];
  whatsappSetting: LandingPageSiteSettingRow | null;
}): LandingPageContent {
  return {
    blocks: buildPublicLandingPageBlocks(
      input.activeLandingPageBlockRows,
      input.fallbackContent,
    ),
    blockItems: buildPublicLandingPageBlockItems(
      input.activeLandingPageBlockRows,
      input.activeBlockItemRows,
      input.fallbackContent,
    ),
    featuredProducts: mapFeaturedProductRowsToPublicProducts(
      input.featuredProductRows,
    ),
    clientLogos: mapClientLogoRowsToPublicLogos(input.activeClientLogoRows),
    testimonials: mapTestimonialRowsToPublicTestimonials(
      input.activeTestimonialRows,
    ),
    faqs:
      input.activeFaqRows.length > 0
        ? input.activeFaqRows
        : input.fallbackContent.faqs,
    galleryItems:
      input.galleryPreviewRows.length > 0
        ? mapGalleryPreviewRowsToPublicGalleryItems(input.galleryPreviewRows)
        : input.fallbackContent.galleryItems,
    whatsapp: buildPublicLandingPageWhatsapp(
      input.whatsappSetting,
      input.fallbackContent,
    ),
  };
}

function buildPublicLandingPageBlocks(
  activeLandingPageBlockRows: LandingPageBlockRow[],
  fallbackContent: LandingPageContent,
): Partial<Record<LandingPageBlockType, LandingPageBlock>> {
  const publicBlocks: Partial<Record<LandingPageBlockType, LandingPageBlock>> =
    {
      ...fallbackContent.blocks,
    };

  for (const blockRow of activeLandingPageBlockRows) {
    if (!isPublicLandingPageBlockType(blockRow.type)) {
      continue;
    }

    const fallbackBlock = fallbackContent.blocks[blockRow.type];

    publicBlocks[blockRow.type] = {
      key: blockRow.key,
      type: blockRow.type,
      title:
        textOrUndefined(blockRow.title) ?? fallbackBlock?.title ?? blockRow.key,
      subtitle: textOrUndefined(blockRow.subtitle),
      description:
        textOrUndefined(blockRow.description) ?? fallbackBlock?.description,
      ctaLabel: textOrUndefined(blockRow.ctaLabel),
      ctaUrl: normalizePublicUrl(blockRow.ctaUrl),
    };
  }

  return publicBlocks;
}

function buildPublicLandingPageBlockItems(
  activeLandingPageBlockRows: LandingPageBlockRow[],
  activeBlockItemRows: LandingPageBlockItemRow[],
  fallbackContent: LandingPageContent,
): Partial<Record<LandingPageBlockType, LandingPageItem[]>> {
  const blockRowById = new Map(
    activeLandingPageBlockRows.map((blockRow) => [blockRow.id, blockRow]),
  );
  const publicItems: Partial<Record<LandingPageBlockType, LandingPageItem[]>> =
    {};

  for (const itemRow of activeBlockItemRows) {
    const blockRow = blockRowById.get(itemRow.blockId);

    if (
      !blockRow ||
      !isPublicLandingPageBlockType(blockRow.type) ||
      !itemRow.title
    ) {
      continue;
    }

    const publicItem: LandingPageItem = {
      title: itemRow.title,
      subtitle: textOrUndefined(itemRow.subtitle),
      description: textOrUndefined(itemRow.description) ?? "",
      ctaLabel: textOrUndefined(itemRow.ctaLabel),
      ctaUrl: normalizePublicUrl(itemRow.ctaUrl),
      imageUrl: normalizePublicUrl(itemRow.imageUrl),
      imageAlt: textOrUndefined(itemRow.imageAlt),
    };

    publicItems[blockRow.type] = [
      ...(publicItems[blockRow.type] ?? []),
      publicItem,
    ];
  }

  return {
    ...fallbackContent.blockItems,
    ...publicItems,
  };
}

function mapFeaturedProductRowsToPublicProducts(
  productRows: LandingPageFeaturedProductRow[],
): LandingPageProduct[] {
  return productRows.map(mapFeaturedProductRowToPublicProduct);
}

function mapFeaturedProductRowToPublicProduct(
  productRow: LandingPageFeaturedProductRow,
): LandingPageProduct {
  return {
    id: productRow.id,
    name: productRow.name,
    slug: productRow.slug,
    shortDescription:
      textOrUndefined(productRow.shortDescription) ??
      DEFAULT_FEATURED_PRODUCT_SHORT_DESCRIPTION,
    imageUrl: normalizePublicUrl(productRow.imageUrl),
    imageAlt: textOrUndefined(productRow.imageAlt) ?? productRow.name,
  };
}

function mapClientLogoRowsToPublicLogos(
  logoRows: LandingPageClientLogoRow[],
): LandingPageLogo[] {
  return logoRows
    .map((logoRow): MaybePublicLandingPageLogo => ({
      name: logoRow.name,
      imageUrl: normalizePublicUrl(logoRow.imageUrl),
      imageAlt: textOrUndefined(logoRow.imageAlt) ?? logoRow.name,
    }))
    .filter(isPublicLandingPageLogo);
}

function isPublicLandingPageLogo(
  logo: MaybePublicLandingPageLogo,
): logo is LandingPageLogo {
  return Boolean(logo.imageUrl);
}

function mapTestimonialRowsToPublicTestimonials(
  testimonialRows: LandingPageTestimonialRow[],
): LandingPageContent["testimonials"] {
  return testimonialRows.map((testimonialRow) => ({
    authorName: testimonialRow.authorName,
    authorRole: textOrUndefined(testimonialRow.authorRole),
    companyName: textOrUndefined(testimonialRow.companyName),
    content: testimonialRow.content,
  }));
}

function mapGalleryPreviewRowsToPublicGalleryItems(
  galleryPreviewRows: LandingPageGalleryPreviewRow[],
): LandingPageGalleryItem[] {
  return galleryPreviewRows.map((galleryPreviewRow) => ({
    title: galleryPreviewRow.title,
    subtitle: textOrUndefined(galleryPreviewRow.subtitle),
    imageUrl: normalizePublicUrl(galleryPreviewRow.imageUrl),
    imageAlt:
      textOrUndefined(galleryPreviewRow.imageAlt) ?? galleryPreviewRow.title,
  }));
}

function buildPublicLandingPageWhatsapp(
  whatsappSetting: LandingPageSiteSettingRow | null,
  fallbackContent: LandingPageContent,
): LandingPageContent["whatsapp"] {
  return {
    phone: stringFromRecord(whatsappSetting?.value, "phone") ?? null,
    message:
      stringFromRecord(whatsappSetting?.value, "defaultMessage") ||
      fallbackContent.whatsapp.message,
  };
}

/**
 * Normaliza URLs editáveis antes de expor no frontend público.
 *
 * Aceitamos caminhos internos e URLs HTTP(S). Outros protocolos são descartados
 * para evitar links inesperados em CTAs, imagens e conteúdo vindo do admin.
 */
export function normalizePublicUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  const trimmed = value.trim();

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    // URL inválida vinda do admin deve sumir do DTO público, não quebrar a home.
    return undefined;
  }
}

/**
 * Mantém apenas dígitos para o formato aceito por `wa.me`.
 */
export function sanitizeWhatsAppPhone(phone?: string | null): string {
  return phone?.replace(/\D/g, "") ?? "";
}

export function stringFromRecord(
  record: Record<string, unknown> | null | undefined,
  key: string,
): string | undefined {
  const value = record?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function textOrUndefined(
  value: string | null | undefined,
): string | undefined {
  return value?.trim() || undefined;
}
