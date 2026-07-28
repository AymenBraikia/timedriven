"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import Dropdown from "@/app/components/dropdown";
import CheckBox from "@/app/components/elements/checkbox";
import filters_type from "@/types/filters";

export type WatchFiltersList = {
    material: boolean;
    brand: boolean;
    movement: boolean;
    condition: boolean;
    size: boolean;
    color: boolean;
    price: boolean;
};

interface WatchFiltersProps {
    filtersList: WatchFiltersList;
    filters: filters_type;
    onFiltersChange: (filters: filters_type) => void;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

export default function WatchFilters({ filtersList, filters, onFiltersChange, active, setActive }: WatchFiltersProps) {
    const toggleFilter = <T extends keyof filters_type>(category: T, value: keyof filters_type[T]) => {
        const values = filters[category];

        onFiltersChange({
            ...filters,
            [category]: { ...values, [value]: !values[value] },
        });
    };

    const updateRange = (category: "caseSize" | "price", bound: "min" | "max", value: number) => {
        const range = filters[category];
        const nextValue = Number.isFinite(value) ? Math.max(0, value) : range[bound];

        onFiltersChange({
            ...filters,
            [category]: bound === "min" ? { min: Math.min(nextValue, range.max), max: range.max } : { min: range.min, max: Math.max(nextValue, range.min) },
        });
    };

    useEffect(() => {
        if (!active) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [active]);

    const filterGroups = [
        { enabled: filtersList.brand, title: "Brands", category: "brands" },
        { enabled: filtersList.movement, title: "Movement", category: "movement" },
        { enabled: filtersList.condition, title: "Condition", category: "condition" },
        { enabled: filtersList.material, title: "Watch Material", category: "material" },
        { enabled: filtersList.color, title: "Dial Color", category: "color" },
    ] as const;

    return (
        <>
            {active && <button type="button" aria-label="Close filters" className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setActive(false)} />}
            <aside
                aria-label="Watch filters"
                className={`frost fixed inset-y-0 left-0 z-50 flex w-[min(22rem,calc(100vw-1rem))] flex-col items-stretch gap-6 overflow-x-hidden overflow-y-auto p-4 shadow-2xl transition-transform duration-300 lg:sticky lg:top-4 lg:z-auto lg:h-[calc(100vh-2rem)] lg:w-60 lg:shrink-0 lg:translate-x-0 lg:p-0 lg:shadow-none ${active ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button type="button" className="button self-end lg:hidden" onClick={() => setActive(false)}>
                    Close
                </button>
                {filterGroups.map(({ enabled, title, category }) => {
                    if (!enabled) return null;

                    const options = filters[category];
                    return (
                        <Dropdown
                            key={category}
                            titles={title}
                        >
                            {Object.keys(options).map((option) => {
                                const key = option as keyof typeof options;
                                return (
                                    <div className="flex w-full cursor-pointer items-center justify-between text-[14px]" key={option} onClick={() => toggleFilter(category, key)}>
                                        <CheckBox label={option} active={Boolean(options[key])} />
                                    </div>
                                );
                            })}
                        </Dropdown>
                    );
                })}
                {filtersList.size && (
                    <Dropdown titles="Case Size (mm)">
                        <div className="flex w-full gap-3 px-1">
                            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                                Min
                                <input
                                    aria-label="Minimum case size"
                                    className="w-full border-b bg-transparent py-1 outline-none"
                                    min={0}
                                    type="number"
                                    value={filters.caseSize.min}
                                    onChange={(event) => updateRange("caseSize", "min", event.target.valueAsNumber)}
                                />
                            </label>
                            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                                Max
                                <input
                                    aria-label="Maximum case size"
                                    className="w-full border-b bg-transparent py-1 outline-none"
                                    min={filters.caseSize.min}
                                    type="number"
                                    value={filters.caseSize.max}
                                    onChange={(event) => updateRange("caseSize", "max", event.target.valueAsNumber)}
                                />
                            </label>
                        </div>
                    </Dropdown>
                )}
                {filtersList.price && (
                    <Dropdown titles="Price">
                        <div className="flex w-full gap-3 px-1">
                            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                                Min
                                <input
                                    aria-label="Minimum price"
                                    className="w-full border-b bg-transparent py-1 outline-none"
                                    min={0}
                                    type="number"
                                    value={filters.price.min}
                                    onChange={(event) => updateRange("price", "min", event.target.valueAsNumber)}
                                />
                            </label>
                            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                                Max
                                <input
                                    aria-label="Maximum price"
                                    className="w-full border-b bg-transparent py-1 outline-none"
                                    min={filters.price.min}
                                    type="number"
                                    value={filters.price.max}
                                    onChange={(event) => updateRange("price", "max", event.target.valueAsNumber)}
                                />
                            </label>
                        </div>
                    </Dropdown>
                )}
            </aside>
        </>
    );
}
