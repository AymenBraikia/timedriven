"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Watch_card from "@/app/components/watch_card";
import dynamic from "next/dynamic";

import { Watch } from "@/types/watch";
import filters_type from "@/types/filters";
import { Spare } from "@/types/spare";
import WatchFilters from "@/app/components/watch_filters";
import Select from "./elements/select";
import generate_filters from "../(site)/lib/generate_filters";
import Input from "./elements/input";
import { useTranslations } from "next-intl";

const QuickViewModal = dynamic(() => import("@/app/components/quick_view"), {
    ssr: false,
});

export default function Watches_list({ watches }: { watches: Watch[] | Spare[] }) {
    const t = useTranslations("common.filters");
    const [view, set_view] = useState<null | Watch | Spare>(null);

    const [active, set_active] = useState<boolean>(false);

    const config = useMemo(() => generate_filters(watches), [watches]);
    const [filters, set_filters] = useState<filters_type>(config);

    const [applyFilters, set_applyFilters] = useState<Map<string, number>>(new Map(Object.keys(filters).map((f) => [f, 0])));

    const [query, set_query] = useState<string>("");

    const [load_limit, set_load_limit] = useState<number>(30);

    const filteredWatches = useMemo(() => {
        let approved = 0;
        return watches.filter((watch) => {
            if (load_limit < approved) return false;
            let match = true;

            if (query) {
                const searchTerms = query.toLowerCase().trim().split(/\s+/);
                const watchData = [watch.brand, watch.model, watch.reference, watch.caseMaterial, watch.dialColor, watch.year?.toString() ?? ""].join(" ").toLowerCase();

                if (!searchTerms.every((term) => watchData.includes(term))) return false;
            }

            if (applyFilters.get("brands")) {
                if (!filters.brands[watch.brand as keyof typeof filters.brands]) return false;
            }

            if (applyFilters.get("movement")) {
                if (!filters.movement[watch.movement as keyof typeof filters.movement]) return false;
            }

            if (applyFilters.get("caseMaterial")) {
                if (!filters.caseMaterial[watch.caseMaterial as keyof typeof filters.caseMaterial]) return false;
            }

            if (applyFilters.get("braceletMaterial")) {
                if (!filters.braceletMaterial[watch.braceletMaterial as keyof typeof filters.braceletMaterial]) return false;
            }

            if (applyFilters.get("dialColor")) {
                if (!filters.dialColor[watch.dialColor as keyof typeof filters.dialColor]) return false;
            }

            if (applyFilters.get("condition")) {
                if (!filters.condition[watch.condition as keyof typeof filters.condition]) return false;
            }

            if (applyFilters.get("includes")) {
                if (
                    filters.includes.box !== watch.boxPapers.box ||
                    filters.includes.papers !== watch.boxPapers.papers ||
                    filters.includes.firstInvoice !== watch.boxPapers.firstInvoice ||
                    filters.includes.serviceInvoice !== watch.boxPapers.serviceInvoice
                )
                    return false;
            }

            if (applyFilters.get("availability")) {
                if (filters.availability.inStock !== watch.inStock) return false;
            }

            if (filters.caseDiameterMm.min > watch.caseDiameterMm || filters.caseDiameterMm.max < watch.caseDiameterMm) return false;

            if (filters.year.min > watch.year || filters.year.max < watch.year) return false;

            if (filters.waterResistance.min > watch.waterResistanceM || filters.waterResistance.max < watch.waterResistanceM) return false;

            if (filters.price.min > watch.price || filters.price.max < watch.price) return false;

            if (match) approved++;
            return match;
        });
    }, [watches, filters, applyFilters, query, load_limit]);

    const [sort, set_sort] = useState<string>(t("newest"));

    const sorted_watches = filteredWatches.sort((a, b) => {
        switch (sort) {
            case t("newest"):
                return new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
            case t("priceLowToHight"):
                return a.price - b.price;
            case t("priceHightToLow"):
                return b.price - a.price;
            case t("brand"):
                return a.brand.localeCompare(b.brand);
            case t("relevance"):
                return b.relevance_score - a.relevance_score;
            default:
                return 1;
        }
    });

    const observed_target = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const target = observed_target.current;
        if (!target || load_limit >= watches.length) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                set_load_limit((prev) => {
                    if (prev >= watches.length) {
                        observer.disconnect();
                        return prev;
                    }
                    return Math.min(prev + 30, watches.length);
                });
            },
            { threshold: 0.1, rootMargin: "200px" },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [watches.length]);

    return (
        <>
            <div className="w-full min-w-0 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
                {
                    <WatchFilters
                        filters={filters}
                        setApply={set_applyFilters}
                        set_Filters={(newFilters) => {
                            set_filters(newFilters);
                        }}
                        active={active}
                        setActive={set_active}
                    />
                }
                <div className="min-w-0 flex-1">
                    <div className="flex w-full flex-col gap-5 py-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex w-full max-w-xl flex-col gap-2">
                            <Input label={t("search")} type="text" placeholder={t("searchPlaceholder")} value={query} onChange={(e) => set_query(e.target.value)} />
                        </div>
                        <div className="flex w-full items-end justify-between gap-4 sm:w-auto sm:justify-end">
                            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-none">
                                <Select set_value={set_sort} value={sort} label={t("sort")} options={[t("newest"), t("relevance"), t("priceHightToLow"), t("priceLowToHight"), t("brand")]} />
                            </div>
                            {
                                <button type="button" className="button flex shrink-0 lg:hidden" onClick={() => set_active(true)}>
                                    {t("filtersLabel")}
                                </button>
                            }
                        </div>
                    </div>

                    <div className={`grid w-full grid-cols-1 gap-x-4 gap-y-6 bg-background sm:grid-cols-2 ${"xl:grid-cols-3"}`}>
                        {sorted_watches.length > 0 ? (
                            sorted_watches.map((watch, i) => (
                                <div ref={i == sorted_watches.length - 1 ? observed_target : undefined} key={watch.slug} onClick={() => set_view(watch)} className="min-w-0 cursor-pointer">
                                    <Watch_card
                                        brand={watch.brand}
                                        condition={watch.condition}
                                        description={watch.description}
                                        braceletMaterial={watch.braceletMaterial}
                                        caseMaterial={watch.caseMaterial}
                                        movement={watch.movement}
                                        name={watch.brand + " " + watch.model}
                                        price={watch.price}
                                        size={watch.caseDiameterMm}
                                        image_src={watch.images[0]}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 col-span-full">
                                <p className="text-secondary text-shine">{t("noResults")}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {view && <QuickViewModal view={view} onClose={() => set_view(null)} />}
        </>
    );
}
