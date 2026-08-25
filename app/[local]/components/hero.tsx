import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("home");

    return (
        <section className="flex-col flex-center w-dvw h-dvh fixed top-0 left-0 text-white">
            <video aria-hidden="true" autoPlay muted loop playsInline preload="metadata" poster="/hero_placeholder.webp" className="absolute inset-0 -z-10 size-full object-cover dark:brightness-50">
                <source src="/hero_vid.mp4" type="video/mp4" />
            </video>

            <div className="flex-center flex-col font-secondary gap-2">
                <h1 className="title1 tracking-widest">{t("heroTitle")}</h1>

                <h5 className="sm:title5 title4 tracking-wider dark:text-shine text-(--bg-secondary)">{t("heroSubtitle")}</h5>

                <a href="#new" aria-label={t("discover")} className="underline sm:title6 title4 dark:text-shine text-(--bg-secondary) tracking-wider">
                    {t("discover")}
                </a>
            </div>
        </section>
    );
}
