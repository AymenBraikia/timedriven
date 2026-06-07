import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/ThemeProvider";

const openSans = localFont({
	src: [
		{ path: "../public/Open_Sans/OpenSans-Light.ttf", weight: "300", style: "normal" },
		{ path: "../public/Open_Sans/OpenSans-Regular.ttf", weight: "400", style: "normal" },
		{ path: "../public/Open_Sans/OpenSans-Medium.ttf", weight: "500", style: "normal" },
		{ path: "../public/Open_Sans/OpenSans-SemiBold.ttf", weight: "600", style: "normal" },
		{ path: "../public/Open_Sans/OpenSans-Bold.ttf", weight: "700", style: "normal" },
		{ path: "../public/Open_Sans/OpenSans-ExtraBold.ttf", weight: "800", style: "normal" },
	],
	variable: "--font-open-sans",
});
const gelasio = localFont({
	src: [
		{ path: "../public/Gelasio/Gelasio-Regular.ttf", weight: "400", style: "normal" },
		{ path: "../public/Gelasio/Gelasio-Medium.ttf", weight: "500", style: "normal" },
		{ path: "../public/Gelasio/Gelasio-SemiBold.ttf", weight: "600", style: "normal" },
		{ path: "../public/Gelasio/Gelasio-Bold.ttf", weight: "700", style: "normal" },
	],
	variable: "--font-gelasio",
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
	metadataBase: new URL("https://timedriven.com"), // Replace with your actual domain later
	openGraph: {
		title: "TIMEDRIVEN | High-End Luxury Watches & Expert Consultancy",
		description: "Our curated collection of pre-owned and new luxury watches is waiting for you. Partner with experts for your high-end horology needs.",
		url: "https://timedriven.com",
		siteName: "TIMEDRIVEN",
		images: [
			{
				url: "/new/rolex_daytona.webp", // Falls back to a premier watch image for social sharing links
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
		images: ["/new/rolex_daytona.webp"],
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
					<svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
						<filter id="liquid-frosted" x="0%" y="0%" width="100%" height="100%">
							<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />

							<feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" result="warped" />

							<feGaussianBlur in="warped" stdDeviation="2" />
						</filter>
					</svg>

					<Header />
					<div className="min-h-full flex flex-col max-w-dvw overflow-x-hidden">
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
				</ThemeProvider>
			</body>
		</html>
	);
}
