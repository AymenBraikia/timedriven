import { Suspense } from "react";
import AuthGate from "@/app/components/AuthGate";
import AuthShell from "@/app/components/AuthShell";

import type { Metadata, Viewport } from "next";
import { Open_Sans, Gelasio } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/app/(site)/context/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

const gelasio = Gelasio({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-gelasio",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "ARVELL | Luxury Watch Platform — Concept by Aymen Braikia",
        template: "%s | ARVELL",
    },
    description: "A full-stack luxury watch marketplace concept — consignment, spare parts, appointment booking, and multilingual storefront. Built by Aymen Braikia as a demonstration of production-grade e-commerce architecture.",
    authors: [{ name: "Aymen Braikia" }],
    creator: "Aymen Braikia",
    metadataBase: new URL("https://arvell.vercel.app/"),
    alternates: {
        canonical: "/",
        languages: {
            en: "/en",
            de: "/de",
        },
    },
    openGraph: {
        title: "ARVELL | Luxury Watch Platform Concept",
        description: "A full-stack e-commerce concept for the luxury watch trade — consignment, appointments, multilingual UX.",
        url: "https://arvell.vercel.app/",
        siteName: "ARVELL",
        images: [
            {
                url: "/banner.png",
                width: 1200,
                height: 630,
                alt: "ARVELL Platform Preview",
            },
        ],
        locale: "en_US",
        alternateLocale: ["de_DE"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ARVELL | Luxury Watch Platform Concept",
        description: "A full-stack e-commerce concept for the luxury watch trade.",
        images: ["/banner.png"],
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    formatDetection: {
        telephone: false,
    },
    category: "technology",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${openSans.variable} ${gelasio.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="font-sans">
                <Analytics />
                <SpeedInsights />

                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                            <filter id="liquid-frosted" x="0%" y="0%" width="100%" height="100%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" result="warped" />
                                <feGaussianBlur in="warped" stdDeviation="2" />
                            </filter>
                        </svg>

                        <Suspense fallback={<AuthShell session={undefined}>{children}</AuthShell>}>
                            <AuthGate>{children}</AuthGate>
                        </Suspense>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}