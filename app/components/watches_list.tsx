"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Watch_card from "@/app/components/watch_card";
import dynamic from "next/dynamic";

import { Watch } from "@/app/types/watch";
import Dropdown from "../components/dropdown";
import CheckBox from "../components/elements/checkbox";
import filters_type from "../types/filters";

const QuickViewModal = dynamic(() => import("@/app/components/quick_view"), {
    ssr: false,
});

export default function Watches_list({
    cardsPerRow = 3,
    watches,
    filters_list,
}: {
    cardsPerRow?: number;
    watches: Watch[];
    filters_list?: { material: boolean; brand: boolean; movement: boolean; condition: boolean; size: boolean; color: boolean; price: boolean };
}) {
    const [view, set_view] = useState<null | { price: number; src: string[]; name: string; id: number | string }>(null);
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
    const [applyFilters, set_applyFilters] = useState<boolean>(false);

    const filteredWatches = watches.filter((watch) => {
        for (const b in filters.brands) if (b == watch.brand) if (filters.brands[b as keyof typeof filters.brands]) return true;
        for (const b in filters.movement) if (b == watch.movement) if (filters.movement[b as keyof typeof filters.movement]) return true;
        for (const b in filters.condition) if (b == watch.condition) if (filters.condition[b as keyof typeof filters.condition]) return true;
        for (const b in filters.material) if (b == watch.caseMaterial) if (filters.material[b as keyof typeof filters.material]) return true;
        for (const b in filters.color) if (b == watch.dialColor) if (filters.color[b as keyof typeof filters.color]) return true;

        return !applyFilters;
    });

    return (
        <>
            <div className="w-full h-fit flex justify-center items-start gap-32">
                {filters_list && (
                    <Filters
                        filters_list={filters_list}
                        set_applyFilters={set_applyFilters}
                        filters={filters}
                        onFiltersChange={(newFilters) => {
                            let apply = false;
                            for (const f in newFilters)
                                if (apply) break;
                                else {
                                    const filter_type = newFilters[f as keyof typeof newFilters];
                                    for (const value in filter_type)
                                        if (filter_type[value as keyof typeof filter_type] && typeof filter_type[value as keyof typeof filter_type] == "boolean") {
                                            apply = true;
                                            break;
                                        }
                                }

                            set_applyFilters(apply);
                            set_filters(newFilters);
                        }}
                    />
                )}
                <div className="flex-center flex-col">
                    <div className="w-full py-4 flex justify-between items-start">
                        <div className="w-fit flex justify-start items-start flex-col gap-4">
                            <label className="font-semibold" htmlFor="search">
                                Search
                            </label>
                            <input type="text" id="search" className="outline-none border-b w-100 py-2" placeholder="Search for watches..." />
                        </div>
                        <div className="w-fit flex justify-start items-start flex-col gap-4">
                            <label className="font-semibold" htmlFor="sort">
                                Sort
                            </label>
                            <select id="sort" className="outline-0 pr-4">
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
                    </div>

                    <div className="flex justify-center items-start gap-4 flex-wrap w-full bg-background">
                        {filteredWatches.length > 0 ? (
                            filteredWatches.map((watch) => (
                                <div
                                    key={watch.slug}
                                    onClick={() => set_view({ price: watch.price, src: watch.images, id: watch.slug, name: watch.brand + " " + watch.model })}
                                    className={`cursor-pointer ${filters_list ? "w-[calc(33%-8px)]" : "w-[calc(25%-12px)]"}`}
                                >
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

function Filters({
    filters_list,
    filters,
    onFiltersChange,
}: {
    filters_list: { material: boolean; brand: boolean; movement: boolean; condition: boolean; size: boolean; color: boolean; price: boolean };
    filters: filters_type;
    set_applyFilters: Dispatch<SetStateAction<boolean>>;
    onFiltersChange: (filters: filters_type) => void;
}) {
    const handleBrandChange = (brand: keyof typeof filters.brands) => {
        onFiltersChange({
            ...filters,
            brands: { ...filters.brands, [brand]: !filters.brands[brand] },
        });
    };

    const handleMovementChange = (movement: keyof typeof filters.movement) => {
        onFiltersChange({
            ...filters,
            movement: { ...filters.movement, [movement]: !filters.movement[movement] },
        });
    };

    const handleConditionChange = (condition: keyof typeof filters.condition) => {
        onFiltersChange({
            ...filters,
            condition: { ...filters.condition, [condition]: !filters.condition[condition] },
        });
    };

    const handleColorChange = (color: keyof typeof filters.color) => {
        onFiltersChange({
            ...filters,
            color: { ...filters.color, [color]: !filters.color[color] },
        });
    };

    const handleMaterialChange = (material: keyof typeof filters.material) => {
        onFiltersChange({
            ...filters,
            material: { ...filters.material, [material]: !filters.material[material] },
        });
    };

    return (
        <aside className="flex flex-col gap-6 w-fit min-w-50">
            {filters_list?.brand && (
                <Dropdown
                    titles="Brands"
                    children={Object.keys(filters.brands).map((brand) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={brand} onClick={() => handleBrandChange(brand as keyof typeof filters.brands)}>
                            <CheckBox label={brand} active={filters.brands[brand as keyof typeof filters.brands]} />
                        </div>
                    ))}
                />
            )}
            {filters_list?.movement && (
                <Dropdown
                    titles="Movement"
                    children={Object.keys(filters.movement).map((movement) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={movement} onClick={() => handleMovementChange(movement as keyof typeof filters.movement)}>
                            <CheckBox label={movement} active={filters.movement[movement as keyof typeof filters.movement]} />
                        </div>
                    ))}
                />
            )}
            {filters_list?.condition && (
                <Dropdown
                    titles="Condition"
                    children={Object.keys(filters.condition).map((condition) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={condition} onClick={() => handleConditionChange(condition as keyof typeof filters.condition)}>
                            <CheckBox label={condition} active={filters.condition[condition as keyof typeof filters.condition]} />
                        </div>
                    ))}
                />
            )}
            {filters_list.material && (
                <Dropdown
                    titles="Watch Material"
                    children={Object.keys(filters.material).map((material) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={material} onClick={() => handleMaterialChange(material as keyof typeof filters.material)}>
                            <CheckBox label={material} active={filters.material[material as keyof typeof filters.material]} />
                        </div>
                    ))}
                />
            )}
            {filters_list?.color && (
                <Dropdown
                    titles="Dial Color"
                    children={Object.keys(filters.color).map((color) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={color} onClick={() => handleColorChange(color as keyof typeof filters.color)}>
                            <CheckBox label={color} active={filters.color[color as keyof typeof filters.color]} />
                        </div>
                    ))}
                />
            )}
        </aside>
    );
}

const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
function format(n: number): string {
    return intl.format(n);
}
