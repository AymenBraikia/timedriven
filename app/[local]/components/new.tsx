"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useState } from "react";
import FadeInObserver from "./fade_wrapper";
import dynamic from "next/dynamic";
import AtcBtn from "./buttons/addToCart";
import { Watch } from "@/types/watch";
import { format_price } from "../(site)/lib/price_format";
import { useTranslations } from "next-intl";

const QuickViewModal = dynamic(() => import("./quick_view"), {
    ssr: false,
});
export default function New({ watches }: { watches: Watch[] }) {
    const t = useTranslations("home");
    const t_btn = useTranslations("common.buttons");
    const [view, set_view] = useState<null | Watch>(null);

    return (
        <section className="flex flex-col justify-center items-start sm:p-16 p-4 py-8 w-dvw gap-6" id="new">
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <h1 className={`text-5xl font-secondary tracking-wide`}>{t("newArrivalsHeading")}</h1>
                </FadeInObserver>
            </div>
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <p className="text-shine">{t("newArrivalsSubtext")}</p>
                </FadeInObserver>
            </div>
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <Link aria-label={t_btn("viewAllWatches")} href={"/shop"} className={`underline`}>
                        {t_btn("viewAllWatches")}
                    </Link>
                </FadeInObserver>
            </div>
            <FadeInObserver>
                <div className={`w-full sm-w-fit`}>
                    <List display={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}>
                        {watches.map((d) => (
                            <div aria-label={`${d.brand + " " + d.model}`} className="h-130 sm:h-110 w-full flex flex-col justify-start items-start gap-4 transition-long group" key={d.slug} onClick={() => innerWidth < 1536 && set_view(d)}>
                                <div className="relative w-full h-9/10 sm:h-fit flex-center overflow-hidden sm:aspect-square">
                                    <Image
                                        src={d.images[0]}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                        fill
                                        alt={d.brand + " " + d.model}
                                        className="object-contain select-none scale-100 brightness-100 transition-long group-hover:scale-105 group-hover:brightness-50"
                                    />
                                    <div className="2xl:flex-center relative w-full h-15 fade-out group-hover:fade-in transition-long hidden gap-4 z-10">
                                        <button aria-label={`quick view ${d.brand + " " + d.model}`} type="button" className="button cursor-pointer p-4 select-none transition-default capitalize min-w-fit whitespace-nowrap text-sm h-fit" onClick={() => set_view(d)}>
                                            {t_btn("quick_view")}
                                        </button>
                                        <div className="w-fit text-white hover:text-foreground transition-default capitalize min-w-fit whitespace-nowrap text-sm">
                                            <AtcBtn slug={d.slug} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-start items-start max-h-30 min-h-25">
                                    <h5 className="sm:title5 title2 font-medium font-secondary capitalize text-shine">{d.brand + " " + d.model}</h5>
                                    <h6 className="sm:title6 title3 font-medium font-secondary">{format_price(d.price)}</h6>
                                </div>
                            </div>
                        ))}
                    </List>
                </div>
            </FadeInObserver>
            {<QuickViewModal view={view} onClose={() => set_view(null)} />}
        </section>
    );
}
