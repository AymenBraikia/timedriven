import type { MetadataRoute } from "next";

const baseUrl = "https://timedriven.vercel.app";

const locales = ["en", "de"] as const;

const routes = [
    "",
    "/shop",
    "/spare",
    "/sell",
    "/polish",
    "/store",
    "/booking",

    // Information / service pages
    "/info/about",
    "/info/cookies",
    "/info/disclaimer",
    "/info/faq",
    "/info/imprint",
    "/info/payments",
    "/info/policy",
    "/info/polishing",
    "/info/terms",
    "/info/vacancies",
    "/info/withdraw",
] as const;

// Brands currently linked from the homepage.
const brandSlugs = ["audemars-piguet", "breitling", "cartier", "iwc", "omega", "patek-philippe", "rolex", "zenith"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        routes.map((route) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: now,
            changeFrequency: route === "" ? "daily" : "weekly",
            priority: route === "" ? 1 : ["/shop", "/spare"].includes(route) ? 0.9 : 0.7,
        })),
    );

    const brandPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        brandSlugs.map((brand) => ({
            url: `${baseUrl}/${locale}/brand/${brand}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
    );

    return [...staticPages, ...brandPages];
}
