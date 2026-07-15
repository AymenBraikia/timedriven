import type { Metadata } from "next";
import { Open_Sans, Gelasio } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import { ThemeProvider } from "@/app/(site)/context/ThemeProvider";
import { CartProvider } from "@/app/(site)/context/cartContext";
import { AuthProvider } from "@/app/(site)/context/authContext";

import { cookies } from "next/headers";

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
        default: "TIMEDRIVEN | High-End Luxury Watches & Expert Consultancy",
        template: "%s | TIMEDRIVEN",
    },
    description: "Explore our curated collection of pristine pre-owned and new luxury watches, including Rolex, Patek Philippe, and Cartier. Book a professional consultation with our horology experts today.",
    keywords: ["luxury watches", "pre-owned Rolex", "Patek Philippe Calatrava", "Cartier Panthere", "Rolex Daytona", "buy luxury watches", "watch consultancy", "TIMEDRIVEN"],
    authors: [{ name: "TIMEDRIVEN" }],
    creator: "TIMEDRIVEN",
    metadataBase: new URL("https://timedriven.vercel.app/"),
    openGraph: {
        title: "TIMEDRIVEN | High-End Luxury Watches & Expert Consultancy",
        description: "Our curated collection of pre-owned and new luxury watches is waiting for you. Partner with experts for your high-end horology needs.",
        url: "https://timedriven.vercel.app/",
        siteName: "TIMEDRIVEN",
        images: [
            {
                url: "/banner.webp",
                width: 1200,
                height: 630,
                alt: "TIMEDRIVEN Luxury Watch Collection",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TIMEDRIVEN | High-End Luxury Watches",
        description: "Your partner for high-end watches. Explore Rolex, Patek Philippe, Cartier, and book expert appointments.",
        images: ["//banner.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const session = { name: (cookieStore.get("name") as string | undefined) || null };

    return (
        <html lang="en" className={`${openSans.variable} ${gelasio.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="font-sans">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                        <filter id="liquid-frosted" x="0%" y="0%" width="100%" height="100%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" result="warped" />
                            <feGaussianBlur in="warped" stdDeviation="2" />
                        </filter>
                    </svg>

                    <AuthProvider initialSession={session}>
                        <CartProvider>
                            <Header />
                            <div className="min-h-full flex-center flex-col max-w-dvw overflow-x-hidden pt-20">
                                <style>{`
							.liquid-glass {
								backdrop-filter: url(#liquid-frosted) blur(4px);
								-webkit-backdrop-filter: url(#liquid-frosted) blur(4px);
								background-color: var(--clr-glass);
								}
								`}</style>
                                {children}
                                <Footer />
                            </div>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
