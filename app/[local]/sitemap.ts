import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://timedriven.vercel.app/"; // Swap with your live domain when ready

	// Core static routes derived from your navigation architecture
	const coreRoutes = ["", "/watches", "/spare-parts", "/about-us", "/store", "/sell-consign", "/services", "/faq"];

	return coreRoutes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === "" ? "daily" : "weekly",
		priority: route === "" ? 1.0 : 0.8,
	}));
}
