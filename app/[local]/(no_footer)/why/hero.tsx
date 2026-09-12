import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Hero() {
    const t = await getTranslations("why");

    return (
        <section className="w-full min-h-dvh flex-center flex-col gap-10 text-center">
            <p className="text-sm text-shine min-w-fit whitespace-nowrap uppercase tracking-widest">{t("hero.eyebrow")}</p>
            <h1 className="font-primary xl:text-6xl! tracking-wider italic font-light">
                {t.rich("hero.title", {
                    br: () => <br />,
                    span: (chunks) => <span className="text-secondary">{chunks}</span>,
                })}
            </h1>
            <p className="font-thin text-secondary max-w-200 text-center tracking-wider">{t("hero.description")}</p>
            <div className="flex-center gap-8">
                <Link href={"#gap"} className="font-thin button">
                    {t("hero.seeDifference")}
                </Link>
                <Link href={"/"} className="font-thin button">
                    {t("hero.openStorefront")}
                </Link>
            </div>
            <Link href="https://www.instagram.com/direct/t/17848725818503902/" className="button2 font-primary title5">
                {t("cta.sendStock")}
            </Link>
        </section>
    );
}
