import "server-only";

import type {
  AdminAuditLogRepositories,
  CategoryRepositories,
  LandingPageRepositories,
  MediaRepositories,
  ProductRepositories,
  SiteSettingRepositories,
  TagRepositories,
} from "@/domain/contracts";
import { DrizzleAdminAuditLogRepository } from "@/infra/repositories/drizzle-admin-audit-log-repository";
import { DrizzleCategoryRepository } from "@/infra/repositories/drizzle-category-repository";
import { DrizzleLandingPageRepository } from "@/infra/repositories/drizzle-landing-page-repository";
import { DrizzleMediaRepository } from "@/infra/repositories/drizzle-media-repository";
import { DrizzleProductRepository } from "@/infra/repositories/drizzle-product-repository";
import { DrizzleSiteSettingRepository } from "@/infra/repositories/drizzle-site-setting-repository";
import { DrizzleTagRepository } from "@/infra/repositories/drizzle-tag-repository";

export const landingPageRepositories: LandingPageRepositories =
  new DrizzleLandingPageRepository();
export const productRepositories: ProductRepositories =
  new DrizzleProductRepository();
export const categoryRepositories: CategoryRepositories =
  new DrizzleCategoryRepository();
export const tagRepositories: TagRepositories = new DrizzleTagRepository();
export const siteSettingRepositories: SiteSettingRepositories =
  new DrizzleSiteSettingRepository();
export const mediaRepositories: MediaRepositories =
  new DrizzleMediaRepository();
export const adminAuditLogRepositories: AdminAuditLogRepositories =
  new DrizzleAdminAuditLogRepository();
