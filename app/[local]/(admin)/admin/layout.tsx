import type { Metadata } from "next";
import { Open_Sans, Gelasio } from "next/font/google";

import "../../globals.css";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/app/(site)/context/ThemeProvider";

import { require_admin } from "@/app/server/admin/session";
import Sidebar from "./components/sidebar";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });
const gelasio = Gelasio({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-gelasio", display: "swap" });

export const metadata: Metadata = {
    title: { default: "Admin", template: "%s | ARVELL Admin" },
    robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // The real gate. proxy.ts only saves a round trip, it is not the security boundary.
    const session = await require_admin();

    return (
        <html lang="en" className={`${openSans.variable} ${gelasio.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="font-sans">
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <div className="min-h-dvh flex flex-col md:flex-row">
                            <Sidebar name={session.name} />
                            <main className="flex-1 min-w-0 p-5 md:p-8">{children}</main>
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
