CREATE EXTENSION IF NOT EXISTS "pgcrypto";--> statement-breakpoint
CREATE TYPE "public"."landing_page_block_type" AS ENUM('hero', 'client_logos', 'why_choose_us', 'featured_products', 'solutions', 'how_it_works', 'testimonials', 'faq', 'final_cta', 'custom_editorial');--> statement-breakpoint
CREATE TYPE "public"."media_owner_type" AS ENUM('product', 'landing_page', 'gallery', 'testimonial', 'client_logo', 'general');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('active', 'inactive', 'unavailable');--> statement-breakpoint
CREATE TYPE "public"."tag_type" AS ENUM('general', 'public', 'occasion', 'feature', 'search');--> statement-breakpoint
CREATE TYPE "public"."whatsapp_click_type" AS ENUM('general_cta', 'product_direct', 'product_list', 'footer_work_with_us', 'representative', 'photography');--> statement-breakpoint
CREATE TABLE "admin_audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_clerk_user_id" text,
	"actor_email" text,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "client_logos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"media_asset_id" uuid NOT NULL,
	"website_url" text,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "gallery_albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"event_type" text,
	"event_date" date,
	"city" text,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "gallery_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" uuid NOT NULL,
	"media_asset_id" uuid NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "landing_page_block_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_id" uuid NOT NULL,
	"media_asset_id" uuid,
	"title" text,
	"subtitle" text,
	"description" text,
	"cta_label" text,
	"cta_url" text,
	"metadata" jsonb,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "landing_page_block_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"label" text,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_page_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"type" "landing_page_block_type" NOT NULL,
	"title" text,
	"subtitle" text,
	"description" text,
	"cta_label" text,
	"cta_url" text,
	"metadata" jsonb,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_type" "media_owner_type" DEFAULT 'general' NOT NULL,
	"storage_key" text NOT NULL,
	"url" text NOT NULL,
	"original_filename" text,
	"mime_type" text NOT NULL,
	"size_bytes" integer,
	"width" integer,
	"height" integer,
	"alt_text" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"product_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_categories_pk" PRIMARY KEY("product_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "product_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"media_asset_id" uuid NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_specs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_tags" (
	"product_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_tags_pk" PRIMARY KEY("product_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "product_videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"provider" text,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"short_description" text,
	"full_description" text,
	"status" "product_status" DEFAULT 'inactive' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"type" "tag_type" DEFAULT 'general' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_name" text NOT NULL,
	"author_role" text,
	"company_name" text,
	"content" text NOT NULL,
	"media_asset_id" uuid,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "whatsapp_click_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "whatsapp_click_type" NOT NULL,
	"product_id" uuid,
	"source_path" text,
	"message_preview" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_logos" ADD CONSTRAINT "client_logos_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_album_id_gallery_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_block_items" ADD CONSTRAINT "landing_page_block_items_block_id_landing_page_blocks_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."landing_page_blocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_block_items" ADD CONSTRAINT "landing_page_block_items_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_block_products" ADD CONSTRAINT "landing_page_block_products_block_id_landing_page_blocks_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."landing_page_blocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_block_products" ADD CONSTRAINT "landing_page_block_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_specs" ADD CONSTRAINT "product_specs_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_videos" ADD CONSTRAINT "product_videos_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whatsapp_click_events" ADD CONSTRAINT "whatsapp_click_events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admin_audit_logs_actor_clerk_user_id_idx" ON "admin_audit_logs" USING btree ("actor_clerk_user_id");--> statement-breakpoint
CREATE INDEX "admin_audit_logs_action_idx" ON "admin_audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "admin_audit_logs_entity_idx" ON "admin_audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "admin_audit_logs_created_at_idx" ON "admin_audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_is_active_idx" ON "categories" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "categories_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "categories_deleted_at_idx" ON "categories" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "client_logos_active_position_idx" ON "client_logos" USING btree ("is_active","position");--> statement-breakpoint
CREATE INDEX "client_logos_media_asset_id_idx" ON "client_logos" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "client_logos_deleted_at_idx" ON "client_logos" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "faqs_active_position_idx" ON "faqs" USING btree ("is_active","position");--> statement-breakpoint
CREATE INDEX "faqs_deleted_at_idx" ON "faqs" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "gallery_albums_slug_unique" ON "gallery_albums" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "gallery_albums_is_active_idx" ON "gallery_albums" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "gallery_albums_event_type_idx" ON "gallery_albums" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "gallery_albums_event_date_idx" ON "gallery_albums" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "gallery_albums_deleted_at_idx" ON "gallery_albums" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "gallery_photos_album_id_idx" ON "gallery_photos" USING btree ("album_id");--> statement-breakpoint
CREATE INDEX "gallery_photos_media_asset_id_idx" ON "gallery_photos" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "gallery_photos_is_cover_idx" ON "gallery_photos" USING btree ("is_cover");--> statement-breakpoint
CREATE INDEX "gallery_photos_album_position_idx" ON "gallery_photos" USING btree ("album_id","position");--> statement-breakpoint
CREATE INDEX "gallery_photos_deleted_at_idx" ON "gallery_photos" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "gallery_photos_one_active_cover_unique" ON "gallery_photos" USING btree ("album_id") WHERE "gallery_photos"."is_cover" = true and "gallery_photos"."is_active" = true and "gallery_photos"."deleted_at" is null;--> statement-breakpoint
CREATE INDEX "landing_page_block_items_block_id_idx" ON "landing_page_block_items" USING btree ("block_id");--> statement-breakpoint
CREATE INDEX "landing_page_block_items_media_asset_id_idx" ON "landing_page_block_items" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "landing_page_block_items_block_position_idx" ON "landing_page_block_items" USING btree ("block_id","position");--> statement-breakpoint
CREATE INDEX "landing_page_block_items_deleted_at_idx" ON "landing_page_block_items" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "landing_page_block_products_block_product_unique" ON "landing_page_block_products" USING btree ("block_id","product_id");--> statement-breakpoint
CREATE INDEX "landing_page_block_products_block_id_idx" ON "landing_page_block_products" USING btree ("block_id");--> statement-breakpoint
CREATE INDEX "landing_page_block_products_product_id_idx" ON "landing_page_block_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "landing_page_block_products_block_position_idx" ON "landing_page_block_products" USING btree ("block_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "landing_page_blocks_key_unique" ON "landing_page_blocks" USING btree ("key");--> statement-breakpoint
CREATE INDEX "landing_page_blocks_type_idx" ON "landing_page_blocks" USING btree ("type");--> statement-breakpoint
CREATE INDEX "landing_page_blocks_active_position_idx" ON "landing_page_blocks" USING btree ("is_active","position");--> statement-breakpoint
CREATE INDEX "landing_page_blocks_deleted_at_idx" ON "landing_page_blocks" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_assets_storage_key_unique" ON "media_assets" USING btree ("storage_key");--> statement-breakpoint
CREATE INDEX "media_assets_owner_type_idx" ON "media_assets" USING btree ("owner_type");--> statement-breakpoint
CREATE INDEX "media_assets_deleted_at_idx" ON "media_assets" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "product_categories_product_id_idx" ON "product_categories" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_categories_category_id_idx" ON "product_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "product_media_product_id_idx" ON "product_media" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_media_media_asset_id_idx" ON "product_media" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "product_media_is_cover_idx" ON "product_media" USING btree ("is_cover");--> statement-breakpoint
CREATE INDEX "product_media_position_idx" ON "product_media" USING btree ("position");--> statement-breakpoint
CREATE UNIQUE INDEX "product_media_one_active_cover_unique" ON "product_media" USING btree ("product_id") WHERE "product_media"."is_cover" = true and "product_media"."is_active" = true;--> statement-breakpoint
CREATE INDEX "product_specs_product_id_idx" ON "product_specs" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_specs_product_position_idx" ON "product_specs" USING btree ("product_id","position");--> statement-breakpoint
CREATE INDEX "product_tags_product_id_idx" ON "product_tags" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_tags_tag_id_idx" ON "product_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "product_videos_product_id_idx" ON "product_videos" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_videos_is_active_idx" ON "product_videos" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "product_videos_product_position_idx" ON "product_videos" USING btree ("product_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_unique" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "products_status_idx" ON "products" USING btree ("status");--> statement-breakpoint
CREATE INDEX "products_is_featured_idx" ON "products" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "products_name_idx" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX "products_deleted_at_idx" ON "products" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "site_settings_key_unique" ON "site_settings" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_unique" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tags_type_idx" ON "tags" USING btree ("type");--> statement-breakpoint
CREATE INDEX "tags_is_active_idx" ON "tags" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "tags_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE INDEX "tags_deleted_at_idx" ON "tags" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "testimonials_active_position_idx" ON "testimonials" USING btree ("is_active","position");--> statement-breakpoint
CREATE INDEX "testimonials_media_asset_id_idx" ON "testimonials" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "testimonials_deleted_at_idx" ON "testimonials" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "whatsapp_click_events_type_idx" ON "whatsapp_click_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "whatsapp_click_events_product_id_idx" ON "whatsapp_click_events" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "whatsapp_click_events_created_at_idx" ON "whatsapp_click_events" USING btree ("created_at");
