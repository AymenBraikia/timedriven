"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { use, useEffect, useMemo, useState } from "react";
import FadeInObserver from "./fade_wrapper";
import dynamic from "next/dynamic";
import AtcBtn from "./buttons/addToCart";
import get_new from "@/app/server/get_new";
import { Watch } from "@/types/watch";

const QuickViewModal = dynamic(() => import("./quick_view"), {
    ssr: false,
});

export default function New() {
    const [view, set_view] = useState<null | Watch>(null);
    const [data, set_data] = useState<Watch[]>([]);

    useEffect(() => {
        get_new().then((results) => {
            console.log(results);
            set_data(results);
        });
    }, []);

    return (
        <section className="flex flex-col justify-center items-start p-16 w-dvw gap-6" id="new">
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <h1 className={`text-5xl font-secondary mr-[0.025rem] tracking-wide`}>
                        New <br />
                        Arrivals
                    </h1>
                </FadeInObserver>
            </div>
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <p>Our curated collection of pre-owned and new watches is waiting for you.</p>
                </FadeInObserver>
            </div>
            <div className="w-fit flex justify-center items-start flex-col">
                <FadeInObserver>
                    <Link aria-label="view all watches" href={"/shop"} className={`underline`}>
                        View all watches
                    </Link>
                </FadeInObserver>
            </div>
            <FadeInObserver>
                <div className={`w-[95dvw] sm-w-fit`}>
                    <List display={{ base: 1, sm: 2, md: 2, lg: 4 }}>
                        {data.map((d) => (
                            <div
                                aria-label={`${d.brand + " " + d.model}`}
                                className="aspect-2/3 sm:aspect-auto sm:h-110 w-full flex flex-col justify-start items-start transition-long group"
                                key={d.slug}
                                onClick={() => innerWidth < 640 && set_view(d)}
                            >
                                <div className="relative w-full h-9/10 sm:h-4/5 flex-center overflow-hidden">
                                    <Image
                                        src={d.images[0]}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 50vw"
                                        fill
                                        alt={d.brand + " " + d.model}
                                        className="object-contain select-none scale-100 brightness-100 transition-long group-hover:scale-105 group-hover:brightness-50"
                                    />
                                    <div className="sm:flex-center relative w-full h-15 fade-out group-hover:fade-in transition-long hidden gap-4 z-10">
                                        <button aria-label={`quick view ${d.brand + " " + d.model}`} type="button" className="button cursor-pointer p-4 select-none transition-default h-full" onClick={() => set_view(d)}>
                                            QUICK VIEW
                                        </button>
                                        <div className="w-fit text-white hover:text-foreground transition-default">
                                            <AtcBtn reference={d.reference} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className="title5 font-secondary">{d.brand + " " + d.model}</h5>
                                <h6 className="title6 font-secondary">{format(d.price)}</h6>
                            </div>
                        ))}
                    </List>
                </div>
            </FadeInObserver>
            {view && <QuickViewModal view={view} onClose={() => set_view(null)} format={format} />}
        </section>
    );
}

const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
function format(n: number): string {
    return intl.format(n);
}
