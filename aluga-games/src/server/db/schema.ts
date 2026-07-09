import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").defaultRandom().primaryKey();

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

const deletedAt = () => timestamp("deleted_at", { withTimezone: true });

const timestamps = () => ({
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const softDelete = () => ({
  deletedAt: deletedAt(),
});

export const productStatusEnum = pgEnum("product_status", [
  "active",
  "inactive",
  "unavailable",
]);

export const tagTypeEnum = pgEnum("tag_type", [
  "general",
  "public",
  "occasion",
  "feature",
  "search",
]);

export const mediaOwnerTypeEnum = pgEnum("media_owner_type", [
  "product",
  "landing_page",
  "gallery",
  "testimonial",
  "client_logo",
  "general",
]);

export const landingPageBlockTypeEnum = pgEnum("landing_page_block_type", [
  "hero",
  "client_logos",
  "why_choose_us",
  "featured_products",
  "solutions",
  "how_it_works",
  "testimonials",
  "faq",
  "final_cta",
  "custom_editorial",
]);

export const whatsappClickTypeEnum = pgEnum("whatsapp_click_type", [
  "general_cta",
  "product_direct",
  "product_list",
  "footer_work_with_us",
  "representative",
  "photography",
]);

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: id(),
    ownerType: mediaOwnerTypeEnum("owner_type").notNull().default("general"),
    storageKey: text("storage_key").notNull(),
    url: text("url").notNull(),
    originalFilename: text("original_filename"),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes"),
    width: integer("width"),
    height: integer("height"),
    altText: text("alt_text"),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("media_assets_storage_key_unique").on(table.storageKey),
    index("media_assets_owner_type_idx").on(table.ownerType),
    index("media_assets_deleted_at_idx").on(table.deletedAt),
  ],
);

export const products = pgTable(
  "products",
  {
    id: id(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    shortDescription: text("short_description"),
    fullDescription: text("full_description"),
    status: productStatusEnum("status").notNull().default("inactive"),
    isFeatured: boolean("is_featured").notNull().default(false),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    index("products_status_idx").on(table.status),
    index("products_is_featured_idx").on(table.isFeatured),
    index("products_name_idx").on(table.name),
    index("products_deleted_at_idx").on(table.deletedAt),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: id(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    isActive: boolean("is_active").notNull().default(true),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("categories_slug_unique").on(table.slug),
    index("categories_is_active_idx").on(table.isActive),
    index("categories_name_idx").on(table.name),
    index("categories_deleted_at_idx").on(table.deletedAt),
  ],
);

export const tags = pgTable(
  "tags",
  {
    id: id(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    type: tagTypeEnum("type").notNull().default("general"),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("tags_slug_unique").on(table.slug),
    index("tags_type_idx").on(table.type),
    index("tags_is_active_idx").on(table.isActive),
    index("tags_name_idx").on(table.name),
    index("tags_deleted_at_idx").on(table.deletedAt),
  ],
);

export const productCategories = pgTable(
  "product_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
  },
  (table) => [
    primaryKey({
      name: "product_categories_pk",
      columns: [table.productId, table.categoryId],
    }),
    index("product_categories_product_id_idx").on(table.productId),
    index("product_categories_category_id_idx").on(table.categoryId),
  ],
);

export const productTags = pgTable(
  "product_tags",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
  },
  (table) => [
    primaryKey({
      name: "product_tags_pk",
      columns: [table.productId, table.tagId],
    }),
    index("product_tags_product_id_idx").on(table.productId),
    index("product_tags_tag_id_idx").on(table.tagId),
  ],
);

export const productMedia = pgTable(
  "product_media",
  {
    id: id(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    mediaAssetId: uuid("media_asset_id")
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "restrict" }),
    isCover: boolean("is_cover").notNull().default(false),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
  },
  (table) => [
    index("product_media_product_id_idx").on(table.productId),
    index("product_media_media_asset_id_idx").on(table.mediaAssetId),
    index("product_media_is_cover_idx").on(table.isCover),
    index("product_media_position_idx").on(table.position),
    uniqueIndex("product_media_one_active_cover_unique")
      .on(table.productId)
      .where(sql`${table.isCover} = true and ${table.isActive} = true`),
  ],
);

export const productVideos = pgTable(
  "product_videos",
  {
    id: id(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    provider: text("provider"),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
  },
  (table) => [
    index("product_videos_product_id_idx").on(table.productId),
    index("product_videos_is_active_idx").on(table.isActive),
    index("product_videos_product_position_idx").on(
      table.productId,
      table.position,
    ),
  ],
);

export const productSpecs = pgTable(
  "product_specs",
  {
    id: id(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    value: text("value").notNull(),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
  },
  (table) => [
    index("product_specs_product_id_idx").on(table.productId),
    index("product_specs_product_position_idx").on(
      table.productId,
      table.position,
    ),
  ],
);

export const landingPageBlocks = pgTable(
  "landing_page_blocks",
  {
    id: id(),
    key: text("key").notNull(),
    type: landingPageBlockTypeEnum("type").notNull(),
    title: text("title"),
    subtitle: text("subtitle"),
    description: text("description"),
    ctaLabel: text("cta_label"),
    ctaUrl: text("cta_url"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("landing_page_blocks_key_unique").on(table.key),
    index("landing_page_blocks_type_idx").on(table.type),
    index("landing_page_blocks_active_position_idx").on(
      table.isActive,
      table.position,
    ),
    index("landing_page_blocks_deleted_at_idx").on(table.deletedAt),
  ],
);

export const landingPageBlockItems = pgTable(
  "landing_page_block_items",
  {
    id: id(),
    blockId: uuid("block_id")
      .notNull()
      .references(() => landingPageBlocks.id, { onDelete: "cascade" }),
    mediaAssetId: uuid("media_asset_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    title: text("title"),
    subtitle: text("subtitle"),
    description: text("description"),
    ctaLabel: text("cta_label"),
    ctaUrl: text("cta_url"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    index("landing_page_block_items_block_id_idx").on(table.blockId),
    index("landing_page_block_items_media_asset_id_idx").on(table.mediaAssetId),
    index("landing_page_block_items_block_position_idx").on(
      table.blockId,
      table.position,
    ),
    index("landing_page_block_items_deleted_at_idx").on(table.deletedAt),
  ],
);

export const landingPageBlockProducts = pgTable(
  "landing_page_block_products",
  {
    id: id(),
    blockId: uuid("block_id")
      .notNull()
      .references(() => landingPageBlocks.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    label: text("label"),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
  },
  (table) => [
    uniqueIndex("landing_page_block_products_block_product_unique").on(
      table.blockId,
      table.productId,
    ),
    index("landing_page_block_products_block_id_idx").on(table.blockId),
    index("landing_page_block_products_product_id_idx").on(table.productId),
    index("landing_page_block_products_block_position_idx").on(
      table.blockId,
      table.position,
    ),
  ],
);

export const galleryAlbums = pgTable(
  "gallery_albums",
  {
    id: id(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    eventType: text("event_type"),
    eventDate: date("event_date"),
    city: text("city"),
    description: text("description"),
    isActive: boolean("is_active").notNull().default(true),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    uniqueIndex("gallery_albums_slug_unique").on(table.slug),
    index("gallery_albums_is_active_idx").on(table.isActive),
    index("gallery_albums_event_type_idx").on(table.eventType),
    index("gallery_albums_event_date_idx").on(table.eventDate),
    index("gallery_albums_deleted_at_idx").on(table.deletedAt),
  ],
);

export const galleryPhotos = pgTable(
  "gallery_photos",
  {
    id: id(),
    albumId: uuid("album_id")
      .notNull()
      .references(() => galleryAlbums.id, { onDelete: "cascade" }),
    mediaAssetId: uuid("media_asset_id")
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "restrict" }),
    isCover: boolean("is_cover").notNull().default(false),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    index("gallery_photos_album_id_idx").on(table.albumId),
    index("gallery_photos_media_asset_id_idx").on(table.mediaAssetId),
    index("gallery_photos_is_cover_idx").on(table.isCover),
    index("gallery_photos_album_position_idx").on(table.albumId, table.position),
    index("gallery_photos_deleted_at_idx").on(table.deletedAt),
    uniqueIndex("gallery_photos_one_active_cover_unique")
      .on(table.albumId)
      .where(
        sql`${table.isCover} = true and ${table.isActive} = true and ${table.deletedAt} is null`,
      ),
  ],
);

export const testimonials = pgTable(
  "testimonials",
  {
    id: id(),
    authorName: text("author_name").notNull(),
    authorRole: text("author_role"),
    companyName: text("company_name"),
    content: text("content").notNull(),
    mediaAssetId: uuid("media_asset_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    index("testimonials_active_position_idx").on(
      table.isActive,
      table.position,
    ),
    index("testimonials_media_asset_id_idx").on(table.mediaAssetId),
    index("testimonials_deleted_at_idx").on(table.deletedAt),
  ],
);

export const faqs = pgTable(
  "faqs",
  {
    id: id(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    index("faqs_active_position_idx").on(table.isActive, table.position),
    index("faqs_deleted_at_idx").on(table.deletedAt),
  ],
);

export const clientLogos = pgTable(
  "client_logos",
  {
    id: id(),
    name: text("name").notNull(),
    mediaAssetId: uuid("media_asset_id")
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "restrict" }),
    websiteUrl: text("website_url"),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
    ...softDelete(),
  },
  (table) => [
    index("client_logos_active_position_idx").on(
      table.isActive,
      table.position,
    ),
    index("client_logos_media_asset_id_idx").on(table.mediaAssetId),
    index("client_logos_deleted_at_idx").on(table.deletedAt),
  ],
);

export const siteSettings = pgTable(
  "site_settings",
  {
    id: id(),
    key: text("key").notNull(),
    value: jsonb("value").$type<Record<string, unknown>>().notNull(),
    ...timestamps(),
  },
  (table) => [uniqueIndex("site_settings_key_unique").on(table.key)],
);

export const whatsappClickEvents = pgTable(
  "whatsapp_click_events",
  {
    id: id(),
    type: whatsappClickTypeEnum("type").notNull(),
    productId: uuid("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    sourcePath: text("source_path"),
    messagePreview: text("message_preview"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  (table) => [
    index("whatsapp_click_events_type_idx").on(table.type),
    index("whatsapp_click_events_product_id_idx").on(table.productId),
    index("whatsapp_click_events_created_at_idx").on(table.createdAt),
  ],
);

export const adminAuditLogs = pgTable(
  "admin_audit_logs",
  {
    id: id(),
    actorClerkUserId: text("actor_clerk_user_id"),
    actorEmail: text("actor_email"),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  (table) => [
    index("admin_audit_logs_actor_clerk_user_id_idx").on(
      table.actorClerkUserId,
    ),
    index("admin_audit_logs_action_idx").on(table.action),
    index("admin_audit_logs_entity_idx").on(table.entityType, table.entityId),
    index("admin_audit_logs_created_at_idx").on(table.createdAt),
  ],
);
