import { relations } from "drizzle-orm";

import {
  adminAuditLogs,
  categories,
  clientLogos,
  faqs,
  galleryAlbums,
  galleryPhotos,
  landingPageBlockItems,
  landingPageBlockProducts,
  landingPageBlocks,
  mediaAssets,
  productCategories,
  productMedia,
  productSpecs,
  productTags,
  productVideos,
  products,
  siteSettings,
  tags,
  testimonials,
  whatsappClickEvents,
} from "@/server/db/schema";

export const mediaAssetsRelations = relations(mediaAssets, ({ many }) => ({
  productMedia: many(productMedia),
  landingPageBlockItems: many(landingPageBlockItems),
  galleryPhotos: many(galleryPhotos),
  testimonials: many(testimonials),
  clientLogos: many(clientLogos),
}));

export const productsRelations = relations(products, ({ many }) => ({
  productCategories: many(productCategories),
  productTags: many(productTags),
  media: many(productMedia),
  videos: many(productVideos),
  specs: many(productSpecs),
  landingPageBlockProducts: many(landingPageBlockProducts),
  whatsappClickEvents: many(whatsappClickEvents),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  productCategories: many(productCategories),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  productTags: many(productTags),
}));

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tag: one(tags, {
    fields: [productTags.tagId],
    references: [tags.id],
  }),
}));

export const productMediaRelations = relations(productMedia, ({ one }) => ({
  product: one(products, {
    fields: [productMedia.productId],
    references: [products.id],
  }),
  mediaAsset: one(mediaAssets, {
    fields: [productMedia.mediaAssetId],
    references: [mediaAssets.id],
  }),
}));

export const productVideosRelations = relations(productVideos, ({ one }) => ({
  product: one(products, {
    fields: [productVideos.productId],
    references: [products.id],
  }),
}));

export const productSpecsRelations = relations(productSpecs, ({ one }) => ({
  product: one(products, {
    fields: [productSpecs.productId],
    references: [products.id],
  }),
}));

export const landingPageBlocksRelations = relations(
  landingPageBlocks,
  ({ many }) => ({
    items: many(landingPageBlockItems),
    products: many(landingPageBlockProducts),
  }),
);

export const landingPageBlockItemsRelations = relations(
  landingPageBlockItems,
  ({ one }) => ({
    block: one(landingPageBlocks, {
      fields: [landingPageBlockItems.blockId],
      references: [landingPageBlocks.id],
    }),
    mediaAsset: one(mediaAssets, {
      fields: [landingPageBlockItems.mediaAssetId],
      references: [mediaAssets.id],
    }),
  }),
);

export const landingPageBlockProductsRelations = relations(
  landingPageBlockProducts,
  ({ one }) => ({
    block: one(landingPageBlocks, {
      fields: [landingPageBlockProducts.blockId],
      references: [landingPageBlocks.id],
    }),
    product: one(products, {
      fields: [landingPageBlockProducts.productId],
      references: [products.id],
    }),
  }),
);

export const galleryAlbumsRelations = relations(galleryAlbums, ({ many }) => ({
  photos: many(galleryPhotos),
}));

export const galleryPhotosRelations = relations(galleryPhotos, ({ one }) => ({
  album: one(galleryAlbums, {
    fields: [galleryPhotos.albumId],
    references: [galleryAlbums.id],
  }),
  mediaAsset: one(mediaAssets, {
    fields: [galleryPhotos.mediaAssetId],
    references: [mediaAssets.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  mediaAsset: one(mediaAssets, {
    fields: [testimonials.mediaAssetId],
    references: [mediaAssets.id],
  }),
}));

export const clientLogosRelations = relations(clientLogos, ({ one }) => ({
  mediaAsset: one(mediaAssets, {
    fields: [clientLogos.mediaAssetId],
    references: [mediaAssets.id],
  }),
}));

export const whatsappClickEventsRelations = relations(
  whatsappClickEvents,
  ({ one }) => ({
    product: one(products, {
      fields: [whatsappClickEvents.productId],
      references: [products.id],
    }),
  }),
);

export const faqsRelations = relations(faqs, () => ({}));

export const siteSettingsRelations = relations(siteSettings, () => ({}));

export const adminAuditLogsRelations = relations(adminAuditLogs, () => ({}));
