"use client";
import { useState } from "react";
import Watch_card from "@/app/components/watch_card";
import dynamic from "next/dynamic";

import { Watch } from "@/types/watch";
import filters_type from "@/types/filters";
import { Spare } from "@/types/spare";
import WatchFilters, { WatchFiltersList } from "@/app/components/watch_filters";

const QuickViewModal = dynamic(() => import("@/app/components/quick_view"), {
    ssr: false,
});

export default function Watches_list({ watches, filters_list }: { watches: Watch[] | Spare[]; filters_list?: WatchFiltersList }) {
    const [view, set_view] = useState<null | Watch | Spare>(null);
    const [filters, set_filters] = useState<filters_type>({
        brands: {
            "Audemars Piguet": false,
            Blancpain: false,
            Breitling: false,
            Cartier: false,
            Chopard: false,
            Chronoswiss: false,
            Corum: false,
            "Frank Muller": false,
            "Girard Perregaux": false,
            "Glashütte Original": false,
            "Grand Seiko": false,
            Hublot: false,
            IWC: false,
            "Jaeger-LeCoultre": false,
            Junghans: false,
            Nomos: false,
            Omega: false,
            Panerai: false,
            "Patek Philippe": false,
            Piaget: false,
            Rolex: false,
            Sinn: false,
            "Tag Heuer": false,
            Tudor: false,
            "Van Cleef & Arpels": false,
        },
        movement: {
            Automatic: false,
            Manual: false,
            Hybrid: false,
        },
        material: {
            "18K rose gold": false,
            "18k white gold": false,
            "18k yellow gold": false,
            Carbon: false,
            Ceramic: false,
            Plastic: false,
            "Rose gold": false,
            Roségold: false,
            Steel: false,
            "Steel/Gold": false,
            "Steel/Rose": false,
            Titanium: false,
            "White gold": false,
            "Yellow gold": false,
        },
        color: {
            Black: false,
            Blue: false,
            Brown: false,
            Champagne: false,
            Champagner: false,
            "Chocolate Wave Arabic Dial": false,
            "diamond dial": false,
            "ghost grey": false,
            "Gold & Black": false,
            Green: false,
            Grey: false,
            "Mother of Pearl": false,
            Pink: false,
            Red: false,
            Silver: false,
            Skeleton: false,
            Tiffany: false,
            Violett: false,
            White: false,
        },
        condition: {
            New: false,
            "Pre-Owned": false,
        },
        caseSize: {
            min: 30,
            max: 50,
        },
        year: {
            min: 1950,
            max: 2026,
        },
        includes: {
            box: false,
            papers: false,
            patek: false,
            servicecard: false,
        },
        price: {
            min: 0,
            max: 1e5,
        },
    });
    const [active, set_active] = useState<boolean>(false);

    const filteredWatches = watches.filter((watch) => {
        const matches = (options: Record<string, boolean>, value: string) => {
            const selected = Object.keys(options).filter((option) => options[option]);
            return selected.length === 0 || selected.includes(value);
        };
        const usesCaseSize = filters.caseSize.min !== 30 || filters.caseSize.max !== 50;
        const usesPrice = filters.price.min !== 0 || filters.price.max !== 1e5;

        return (
            matches(filters.brands, watch.brand) &&
            matches(filters.movement, watch.movement) &&
            matches(filters.condition, watch.condition) &&
            matches(filters.material, watch.caseMaterial) &&
            matches(filters.color, watch.dialColor) &&
            (!usesCaseSize || (watch.caseDiameterMm >= filters.caseSize.min && watch.caseDiameterMm <= filters.caseSize.max)) &&
            (!usesPrice || (watch.price >= filters.price.min && watch.price <= filters.price.max))
        );
    });

    return (
        <>
            <div className="w-full min-w-0 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
                {filters_list && (
                    <WatchFilters
                        filtersList={filters_list}
                        filters={filters}
                        onFiltersChange={(newFilters) => {
                            set_filters(newFilters);
                        }}
                        active={active}
                        setActive={set_active}
                    />
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex w-full flex-col gap-5 py-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex w-full max-w-xl flex-col gap-2">
                            <label className="font-semibold" htmlFor="search">
                                Search
                            </label>
                            <input type="text" id="search" className="w-full border-b py-2 outline-none" placeholder="Search for watches..." />
                        </div>
                        <div className="flex w-full items-end justify-between gap-4 sm:w-auto sm:justify-end">
                            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-none">
                                <label className="font-semibold" htmlFor="sort">
                                    Sort
                                </label>
                                <select id="sort" className="w-full min-w-0 bg-transparent pr-4 outline-0 sm:w-auto">
                                    <option className="text-gray-400" value="Newest">
                                        Newest
                                    </option>
                                    <option className="text-gray-400" value="Price low to high">
                                        Price low to high
                                    </option>
                                    <option className="text-gray-400" value="Price high to low">
                                        Price high to low
                                    </option>
                                    <option className="text-gray-400" value="Brand">
                                        Brand
                                    </option>
                                </select>
                            </div>
                            {filters_list && (
                                <button type="button" className="button flex shrink-0 lg:hidden" onClick={() => set_active(true)}>
                                    Filters
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={`grid w-full grid-cols-1 gap-x-4 gap-y-6 bg-background sm:grid-cols-2 ${filters_list ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"}`}>
                        {filteredWatches.length > 0 ? (
                            filteredWatches.map((watch) => (
                                <div key={watch.slug} onClick={() => set_view(watch)} className="min-w-0 cursor-pointer">
                                    <Watch_card
                                        brand={watch.brand}
                                        condition={watch.condition}
                                        description={watch.description}
                                        material={watch.braceletMaterial}
                                        movement={watch.movement}
                                        name={watch.brand + " " + watch.model}
                                        price={watch.price}
                                        size={watch.size}
                                        image_src={watch.images[0]}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 col-span-full">
                                <p className="text-secondary">No watches match your filters. Try adjusting your selection.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {view && <QuickViewModal view={view} onClose={() => set_view(null)} format={format} />}
        </>
    );
}

const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});

function format(n: number): string {
    return intl.format(n);
}