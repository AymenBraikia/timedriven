"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MouseEvent } from "react";

export default function Hero() {
    const t = useTranslations("home");

    const handleScroll = (e: MouseEvent) => {
        e.preventDefault();
        const targetId = "new";
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });

            window.history.pushState(null, "", `#${targetId}`);
        }
    };

    return (
        <section className="flex-col flex-center w-dvw h-dvh fixed top-0 left-0 text-white">
            <video aria-hidden="true" tabIndex={-1} autoPlay muted loop playsInline preload="auto" poster="/hero_placeholder.webp" className="w-full h-full object-cover brightness-50 absolute left-0 top-0 -z-10">
                <source src="/hero_vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex-center flex-col font-secondary fade-in gap-2">
                <h1 className="title1 tracking-widest">{t("heroTitle")}</h1>
                <h5 className="sm:title5 title4 tracking-wider text-shine">{t("heroSubtitle")}</h5>
                <Link href="#new" onClick={handleScroll} aria-label={t("discover")} className="underline sm:title6 title4 text-shine tracking-wider">
                    {t("discover")}
                </Link>
            </div>
        </section>
    );
}
