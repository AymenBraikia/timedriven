"use client";
import Image from "next/image";
import Link from "next/link";
import services_src from "../../../public/polish.webp";
import sell_src from "../../../public/sell.webp";
import spare_src from "../../../public/spare.webp";
import FadeInObserver from "./fade_wrapper";
import { useTranslations } from "next-intl";

export default function Services() {
    const t = useTranslations("home");
    return (
        <FadeInObserver>
            <div className={`w-full h-fit flex-center gap-8 flex-col lg:flex-row p-4 py-20 md:p-20 lg:py-0`}>
                <Link aria-label="sell or consign" href={"/sell"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
                    <div className="relative w-full h-full transition hover:brightness-100 brightness-75 transition-default overflow-hidden group">
                        <Image sizes="(max-width: 1200px) 100vw, 70vw" src={sell_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
                    </div>
                    <div className="absolute left-4 bottom-4 flex flex-col p-2 text-white">
                        <p className="lg:title4 md:title5 title6">{t("sellConsignCard.title")}</p>
                        <p className="underline">{t("sellConsignCard.cta")}</p>
                    </div>
                </Link>
                <Link aria-label="spare parts" href={"/spare"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
                    <div className="relative w-full h-full transition hover:brightness-100 brightness-75 transition-default overflow-hidden group">
                        <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" src={spare_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
                    </div>
                    <div className="absolute left-4 bottom-4 flex flex-col p-2 text-white">
                        <p className="lg:title4 md:title5 title6">{t("sparePartsCard.title")}</p>
                        <p className="underline">{t("sparePartsCard.cta")}</p>
                    </div>
                </Link>
                <Link aria-label="polishing and services" href={"/polish"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
                    <div className="relative w-full h-full transition hover:brightness-100 brightness-75 transition-default overflow-hidden group">
                        <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" src={services_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
                    </div>
                    <div className="absolute left-4 bottom-4 flex flex-col p-2 text-white">
                        <p className="lg:title4 md:title5 title6">{t("polishCard.title")}</p>
                        <p className="underline">{t("polishCard.cta")}</p>
                    </div>
                </Link>
            </div>
        </FadeInObserver>
    );
}
