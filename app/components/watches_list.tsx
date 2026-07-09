"use client";
import { useState } from "react";
import Watch_card from "@/app/components/watch_card";
import dynamic from "next/dynamic";

import { Watch } from "@/app/types/watch";
import Dropdown from "../components/dropdown";
import CheckBox from "../components/elements/checkbox";
import filters_type from "../types/filters";

const QuickViewModal = dynamic(() => import("@/app/components/quick_view"), {
    ssr: false,
});

export default function Watches_list({ watches }: { watches: Watch[] }) {
    const [view, set_view] = useState<null | { price: number; src: string; name: string; id: number | string }>(null);
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
            new: false,
            preOwned: false,
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

    const filteredWatches = watches.filter((watch) => {
        return true;
    });

    return (
        <>
            <div className="w-full h-fit flex justify-center items-start gap-32">
                <Filters filters={filters} onFiltersChange={(f) => set_filters(f)} />
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
                                <option className="text-gray-400" value="Newest">Newest</option>
                                <option className="text-gray-400" value="Price low to high">Price low to high</option>
                                <option className="text-gray-400" value="Price high to low">Price high to low</option>
                                <option className="text-gray-400" value="Brand">Brand</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center items-start gap-4 flex-wrap w-full bg-background">
                        {filteredWatches.length > 0 ? (
                            filteredWatches.map((watch) => (
                                <div
                                    key={watch.slug}
                                    onClick={() => set_view({ price: watch.price, src: watch.images[0] || "/new/rolex_daytona.webp", id: watch.slug, name: watch.brand + " " + watch.model })}
                                    className="cursor-pointer w-[calc(33%-8px)]"
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
                                        image_src={watch.images[0] || "/new/rolex_daytona.webp"}
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

function Filters({ filters, onFiltersChange }: { filters: filters_type; onFiltersChange: (filters: filters_type) => void }) {
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
            <Dropdown
                titles="Brands"
                children={Object.keys(filters.brands)
                    .slice(0, 7)
                    .map((brand) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={brand} onClick={() => handleBrandChange(brand as keyof typeof filters.brands)}>
                            <CheckBox label={brand} active={filters.brands[brand as keyof typeof filters.brands]} />
                        </div>
                    ))}
            />
            <Dropdown
                titles="Movement"
                children={Object.keys(filters.movement).map((movement) => (
                    <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={movement} onClick={() => handleMovementChange(movement as keyof typeof filters.movement)}>
                        <CheckBox label={movement} active={filters.movement[movement as keyof typeof filters.movement]} />
                    </div>
                ))}
            />
            <Dropdown
                titles="Condition"
                children={Object.keys(filters.condition).map((condition) => (
                    <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={condition} onClick={() => handleConditionChange(condition as keyof typeof filters.condition)}>
                        <CheckBox label={condition} active={filters.condition[condition as keyof typeof filters.condition]} />
                    </div>
                ))}
            />
            <Dropdown
                titles="Watch Material"
                children={Object.keys(filters.material)
                    .slice(0, 4)
                    .map((material) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={material} onClick={() => handleMaterialChange(material as keyof typeof filters.material)}>
                            <CheckBox label={material} active={filters.material[material as keyof typeof filters.material]} />
                        </div>
                    ))}
            />
            <Dropdown
                titles="Dial Color"
                children={Object.keys(filters.color)
                    .slice(0, 4)
                    .map((color) => (
                        <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={color} onClick={() => handleColorChange(color as keyof typeof filters.color)}>
                            <CheckBox label={color} active={filters.color[color as keyof typeof filters.color]} />
                        </div>
                    ))}
            />
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
