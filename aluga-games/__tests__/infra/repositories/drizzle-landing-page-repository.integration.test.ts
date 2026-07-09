import { expect, it, mock } from "bun:test";
import { eq, inArray } from "drizzle-orm";

import {
  clientLogos,
  faqs,
  galleryAlbums,
  galleryPhotos,
  landingPageBlockItems,
  landingPageBlocks,
  mediaAssets,
  productMedia,
  products,
  siteSettings,
  testimonials,
} from "../../../src/server/db/schema";
import {
  buildRepositoryTestKey,
  describeRepositoryIntegration,
  getRepositoryTestDb,
} from "./repository-integration-helpers";

mock.module("server-only", () => ({}));

describeRepositoryIntegration(
  "DrizzleLandingPageRepository integration",
  () => {
    it("returns only active public rows needed by the landing page", async () => {
      const { DrizzleLandingPageRepository } =
        await import("../../../src/infra/repositories/drizzle-landing-page-repository");
      const db = await getRepositoryTestDb();
      const repository = new DrizzleLandingPageRepository();
      const insertedMediaAssets = await db
        .insert(mediaAssets)
        .values([
          {
            altText: "Item",
            mimeType: "image/jpeg",
            ownerType: "landing_page",
            storageKey: buildRepositoryTestKey("landing-item-media"),
            url: "/landing-item.jpg",
          },
          {
            altText: "Logo",
            mimeType: "image/jpeg",
            ownerType: "client_logo",
            storageKey: buildRepositoryTestKey("landing-logo-media"),
            url: "/landing-logo.jpg",
          },
          {
            altText: "Galeria",
            mimeType: "image/jpeg",
            ownerType: "gallery",
            storageKey: buildRepositoryTestKey("landing-gallery-media"),
            url: "/landing-gallery.jpg",
          },
          {
            altText: "Produto",
            mimeType: "image/jpeg",
            ownerType: "product",
            storageKey: buildRepositoryTestKey("landing-product-media"),
            url: "/landing-product.jpg",
          },
        ])
        .returning({ id: mediaAssets.id });
      const insertedBlocks = await db
        .insert(landingPageBlocks)
        .values([
          {
            key: buildRepositoryTestKey("hero-block"),
            title: "Hero ativo",
            type: "hero",
          },
          {
            isActive: false,
            key: buildRepositoryTestKey("inactive-block"),
            title: "Bloco inativo",
            type: "hero",
          },
          {
            deletedAt: new Date(),
            key: buildRepositoryTestKey("deleted-block"),
            title: "Bloco removido",
            type: "hero",
          },
        ])
        .returning({ id: landingPageBlocks.id, key: landingPageBlocks.key });
      const insertedProduct = await db
        .insert(products)
        .values({
          isFeatured: true,
          name: "Produto destaque landing teste",
          shortDescription: "Descrição curta",
          slug: buildRepositoryTestKey("landing-featured-product"),
          status: "active",
        })
        .returning({ id: products.id });
      const insertedGalleryAlbum = await db
        .insert(galleryAlbums)
        .values({
          eventType: "Corporativo",
          slug: buildRepositoryTestKey("landing-gallery-album"),
          title: "Album ativo",
        })
        .returning({ id: galleryAlbums.id });
      const siteSettingKey = buildRepositoryTestKey("landing-setting");
      const activeClientLogoName = buildRepositoryTestKey("logo-active");
      const inactiveClientLogoName = buildRepositoryTestKey("logo-inactive");
      const activeTestimonialAuthor =
        buildRepositoryTestKey("testimonial-active");
      const inactiveTestimonialAuthor = buildRepositoryTestKey(
        "testimonial-inactive",
      );
      const activeFaqQuestion = `${buildRepositoryTestKey("faq-active")}?`;
      const inactiveFaqQuestion = `${buildRepositoryTestKey("faq-inactive")}?`;

      try {
        await db.insert(landingPageBlockItems).values([
          {
            blockId: insertedBlocks[0].id,
            mediaAssetId: insertedMediaAssets[0].id,
            title: "Item ativo",
          },
          {
            blockId: insertedBlocks[0].id,
            isActive: false,
            title: "Item inativo",
          },
          {
            blockId: insertedBlocks[0].id,
            deletedAt: new Date(),
            title: "Item removido",
          },
        ]);
        await db.insert(productMedia).values({
          isCover: true,
          mediaAssetId: insertedMediaAssets[3].id,
          productId: insertedProduct[0].id,
        });
        await db.insert(clientLogos).values([
          {
            mediaAssetId: insertedMediaAssets[1].id,
            name: activeClientLogoName,
          },
          {
            isActive: false,
            mediaAssetId: insertedMediaAssets[1].id,
            name: inactiveClientLogoName,
          },
        ]);
        await db.insert(testimonials).values([
          {
            authorName: activeTestimonialAuthor,
            content: "Depoimento ativo",
          },
          {
            authorName: inactiveTestimonialAuthor,
            content: "Depoimento inativo",
            isActive: false,
          },
        ]);
        await db.insert(faqs).values([
          {
            answer: "Resposta ativa",
            question: activeFaqQuestion,
          },
          {
            answer: "Resposta inativa",
            isActive: false,
            question: inactiveFaqQuestion,
          },
        ]);
        await db.insert(galleryPhotos).values([
          {
            albumId: insertedGalleryAlbum[0].id,
            mediaAssetId: insertedMediaAssets[2].id,
          },
          {
            albumId: insertedGalleryAlbum[0].id,
            isActive: false,
            mediaAssetId: insertedMediaAssets[2].id,
          },
        ]);
        await db.insert(siteSettings).values({
          key: siteSettingKey,
          value: { defaultMessage: "Mensagem teste" },
        });

        const activeBlocks = await repository.findActiveLandingPageBlocks();
        const activeBlockItems =
          await repository.findActiveBlockItemsByBlockIds([
            insertedBlocks[0].id,
          ]);
        const featuredProducts = await repository.findFeaturedProducts();
        const activeClientLogos = await repository.findActiveClientLogos();
        const activeTestimonials = await repository.findActiveTestimonials();
        const activeFaqs = await repository.findActiveFaqs();
        const galleryPreview = await repository.findGalleryPreview();
        const siteSetting =
          await repository.findSiteSettingByKey(siteSettingKey);

        expect(activeBlocks.map((block) => block.id)).toContain(
          insertedBlocks[0].id,
        );
        expect(activeBlocks.map((block) => block.id)).not.toContain(
          insertedBlocks[1].id,
        );
        expect(activeBlocks.map((block) => block.id)).not.toContain(
          insertedBlocks[2].id,
        );
        expect(activeBlockItems.map((item) => item.title)).toEqual([
          "Item ativo",
        ]);
        expect(featuredProducts.map((product) => product.id)).toContain(
          insertedProduct[0].id,
        );
        expect(activeClientLogos.map((logo) => logo.name)).toContain(
          activeClientLogoName,
        );
        expect(activeClientLogos.map((logo) => logo.name)).not.toContain(
          inactiveClientLogoName,
        );
        expect(
          activeTestimonials.map((testimonial) => testimonial.authorName),
        ).toContain(activeTestimonialAuthor);
        expect(
          activeTestimonials.map((testimonial) => testimonial.authorName),
        ).not.toContain(inactiveTestimonialAuthor);
        expect(activeFaqs.map((faq) => faq.question)).toContain(
          activeFaqQuestion,
        );
        expect(activeFaqs.map((faq) => faq.question)).not.toContain(
          inactiveFaqQuestion,
        );
        expect(
          galleryPreview.map((galleryItem) => galleryItem.title),
        ).toContain("Album ativo");
        expect(siteSetting).toEqual({
          key: siteSettingKey,
          value: { defaultMessage: "Mensagem teste" },
        });
      } finally {
        await db
          .delete(siteSettings)
          .where(eq(siteSettings.key, siteSettingKey));
        await db
          .delete(galleryPhotos)
          .where(eq(galleryPhotos.albumId, insertedGalleryAlbum[0].id));
        await db
          .delete(galleryAlbums)
          .where(eq(galleryAlbums.id, insertedGalleryAlbum[0].id));
        await db
          .delete(faqs)
          .where(
            inArray(faqs.question, [activeFaqQuestion, inactiveFaqQuestion]),
          );
        await db
          .delete(testimonials)
          .where(
            inArray(testimonials.authorName, [
              activeTestimonialAuthor,
              inactiveTestimonialAuthor,
            ]),
          );
        await db
          .delete(clientLogos)
          .where(
            inArray(clientLogos.name, [
              activeClientLogoName,
              inactiveClientLogoName,
            ]),
          );
        await db
          .delete(productMedia)
          .where(eq(productMedia.productId, insertedProduct[0].id));
        await db.delete(products).where(eq(products.id, insertedProduct[0].id));
        await db
          .delete(landingPageBlockItems)
          .where(eq(landingPageBlockItems.blockId, insertedBlocks[0].id));
        await db.delete(landingPageBlocks).where(
          inArray(
            landingPageBlocks.id,
            insertedBlocks.map((block) => block.id),
          ),
        );
        await db.delete(mediaAssets).where(
          inArray(
            mediaAssets.id,
            insertedMediaAssets.map((mediaAsset) => mediaAsset.id),
          ),
        );
      }
    });
  },
);
