import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Header() {
    const t = await getTranslations("why.nav");

    return (
        <header className={`flex justify-between items-center w-dvw py-2 px-10 fixed top-0 inset-s-0 z-4000  min-h-20 bg-background`}>
            <Link aria-label={"go back home"} href={"/"} className="min-w-fit whitespace-nowrap text-secondary hover:text-primary transition-default md:text-base text-sm">
                {t("back")}
            </Link>
            <Link aria-label={"home"} href={"/"} className="relative aspect-video w-25 md:block hidden">
                <Image src={"/logo_dark.png"} sizes="(max-width: 768px) 175px, 200px" alt="Arvell" fill className={`object-cover object-center dark:brightness-100 brightness-0 `} />
            </Link>
            <Link aria-label={"see the next step"} href={"#cta"} className="min-w-fit whitespace-nowrap button2 font-normal md:text-base text-sm">
                {t("nextStep")}
            </Link>
        </header>
    );
}
