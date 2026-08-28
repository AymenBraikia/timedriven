import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        qualities: [60, 65],
        minimumCacheTTL: 2678400,
    },
    experimental: {
        optimizeCss: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "core-js": false,
        };
        return config;
    },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
