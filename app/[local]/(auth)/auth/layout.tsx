import type { Metadata } from "next";
import { Open_Sans, Gelasio } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/app/(site)/context/ThemeProvider";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${openSans.variable} ${gelasio.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="font-sans">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="min-h-full flex-center flex-col max-w-dvw overflow-x-hidden pt-20">{children}</div>
                </ThemeProvider>
            </body>
        </html>
    );
}
