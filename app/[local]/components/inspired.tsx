import Link from "next/link";
import FadeInObserver from "./fade_wrapper";
import { useTranslations } from "next-intl";

export default function Inspired(){
        const t = useTranslations("home");
        const t_btn = useTranslations("common.buttons");
    
    return (
        <FadeInObserver>
            <div className="px-4 py-12 flex-center flex-col md:flex-row min-h-100 gap-5 md:h-50 md:gap-20 overflow-hidden text-center relative">
                <p className="text-4xl sm:text-6xl tracking-wider">{t("getInspiredHeading")}</p>
                <div className="md:h-full md:w-0.5 w-full h-1 bg-foreground"></div>
                <div className="text-xl flex flex-col gap-8 h-1/2 font-secondary">
                    <p className="max-w-100 wrap-break-word tracking-wide leading-8 text-shine">{t("getInspiredSubtext")}</p>
                    <Link aria-label="Begin your journey" className="underline text-shine" href={"/shop"}>
                        {t_btn("begin")}
                    </Link>
                </div>
            </div>
        </FadeInObserver>
    );
}