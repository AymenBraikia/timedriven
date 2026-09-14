"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Floating_Cta() {
    const t = useTranslations("why");
    const [active, set_active] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.1) !active && set_active(true);
            else if (active) set_active(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [active]);

    return (
        <div className={`min-w-fit whitespace-nowrap bg-primary transition-default fixed bottom-10 inset-s-1/2 -translate-x-1/2 hover:bg-background active:scale-95 shine ${active ? "fade-in" : "invisible fade-out"}`}>
            <Link href="https://www.instagram.com/ayme.n0412/" className="py-4 px-6 text-shine font-secondary title6 lg:title5 tracking-wider" target="_blank" rel="noopener noreferrer">
                {t("cta.floatingCta")}
            </Link>
        </div>
    );
}
