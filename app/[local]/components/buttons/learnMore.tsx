import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function LearnMore() {
    const t = await getTranslations("intrest")
    return (
        <Link aria-label={t("cta")} className="z-10 sm:text-3xl text-xl button font-light font-secondary" href={"/why"} prefetch={true}>
            {t("cta")}
        </Link>
    );
}