import type { Metadata, Viewport } from "next";
import { Open_Sans, Cormorant_Garamond } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/app/(site)/context/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDirection } from "@/i18n/direction";
import Header from "./why/header";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorantGaramond",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Luxury Watch Platform | Concept by Aymen Braikia",
        template: "%s | ARVELL",
    },
    description: "A full-stack luxury watch marketplace concept — consignment, spare parts, appointment booking, and multilingual storefront. Built by Aymen Braikia as a demonstration of production-grade e-commerce architecture.",
    applicationName: "ARVELL",
    authors: [{ name: "Aymen Braikia" }],
    creator: "Aymen Braikia",
    publisher: "Aymen Braikia",

    metadataBase: new URL("https://arvell.vercel.app/"),
    alternates: {
        canonical: "/en",
        languages: {
            en: "/en",
            de: "/de",
            tr: "/tr",
            fr: "/fr",
            it: "/it",
            es: "/es",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    openGraph: {
        title: "Luxury Watch Platform Concept",
        description: "A full-stack e-commerce concept for the luxury watch trade — consignment, appointments, multilingual UX.",
        url: "https://arvell.vercel.app/en",
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
        title: "Luxury Watch Platform Concept",
        description: "A full-stack e-commerce concept for the luxury watch trade.",
        images: ["/banner.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    formatDetection: {
        telephone: false,
        email: false,
        address: false,
    },
    category: "ecommerce",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#000000",
    colorScheme: "dark light",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ local: string }>;
}>) {
    const { local } = await params;

    const direction = getDirection(local);

    return (
        <html lang={local} dir={direction} className={`${openSans.variable} ${cormorantGaramond.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="font-sans">
                <Analytics />
                <SpeedInsights />

                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        <Header />
                        <div className="h-fit w-dvw flex flex-col justify-center items-center xl:px-25 2xl:px-50 p-4">{children}</div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
