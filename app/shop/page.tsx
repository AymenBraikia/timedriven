"use client";
import Image from "next/image";
import Dropdown from "../components/dropdown";
import CheckBox from "../components/elements/checkbox";
import { useState } from "react";

const dummyWatches = [
    {
        id: 1,
        brand: "Rolex",
        name: "Submariner Black",
        description: "Classic dive watch with exceptional durability",
        price: 9500,
        movement: "Automatic",
        condition: "New",
        size: "Medium",
        material: "Stainless Steel",
        color: "Black",
    },
    {
        id: 2,
        brand: "Patek Philippe",
        name: "Nautilus Blue",
        description: "Iconic luxury sports watch",
        price: 35000,
        movement: "Automatic",
        condition: "Pre-Owned",
        size: "Medium",
        material: "Stainless Steel",
        color: "Blue",
    },
    {
        id: 3,
        brand: "Omega",
        name: "Seamaster White",
        description: "Professional marine timepiece",
        price: 6200,
        movement: "Automatic",
        condition: "New",
        size: "Medium",
        material: "Stainless Steel",
        color: "White",
    },
    {
        id: 4,
        brand: "Cartier",
        name: "Santos Gold",
        description: "Elegant dress watch",
        price: 18000,
        movement: "Automatic",
        condition: "New",
        size: "Small",
        material: "Gold",
        color: "White",
    },
    {
        id: 5,
        brand: "IWC",
        name: "Pilot Chronograph Black",
        description: "Aviation-inspired timepiece",
        price: 7800,
        movement: "Automatic",
        condition: "New",
        size: "Large",
        material: "Stainless Steel",
        color: "Black",
    },
    {
        id: 6,
        brand: "Audemars Piguet",
        name: "Royal Oak Green",
        description: "Luxury integrated bracelet watch",
        price: 29000,
        movement: "Automatic",
        condition: "Pre-Owned",
        size: "Medium",
        material: "Stainless Steel",
        color: "Green",
    },
    {
        id: 7,
        brand: "Rolex",
        name: "Day-Date Platinum",
        description: "Prestigious day-date display",
        price: 45000,
        movement: "Automatic",
        condition: "Pre-Owned",
        size: "Medium",
        material: "Platinum",
        color: "White",
    },
    {
        id: 8,
        brand: "Jaeger-LeCoultre",
        name: "Reverso Manual",
        description: "Reversible case art deco design",
        price: 12000,
        movement: "Manual",
        condition: "New",
        size: "Small",
        material: "Stainless Steel",
        color: "Black",
    },
    {
        id: 9,
        brand: "Omega",
        name: "Speedmaster Titanium",
        description: "Moon watch in titanium",
        price: 8500,
        movement: "Automatic",
        condition: "New",
        size: "Large",
        material: "Titanium",
        color: "Black",
    },
    {
        id: 10,
        brand: "Rolex",
        name: "Datejust Blue",
        description: "Timeless three-hand watch",
        price: 8200,
        movement: "Automatic",
        condition: "Pre-Owned",
        size: "Medium",
        material: "Stainless Steel",
        color: "Blue",
    },
];

export default function ShopPage() {
    const [filters, set_filters] = useState({
        brands: {
            Rolex: false,
            "Patek Philippe": false,
            Cartier: false,
            "Audemars Piguet": false,
            Omega: false,
            IWC: false,
            "Jaeger-LeCoultre": false,
        },
        movement: {
            Automatic: false,
            Manual: false,
            Hybrid: false,
        },
        condition: {
            New: false,
            "Pre-Owned": false,
        },
        size: {
            Small: false,
            Medium: false,
            Large: false,
        },
        watchMaterial: {
            "Stainless Steel": false,
            Titanium: false,
            Gold: false,
            Platinum: false,
        },
        color: {
            Black: false,
            White: false,
            Blue: false,
            Green: false,
        },
    });
    type FilterCategory = keyof typeof filters;

    const handleFilterChange = (category: FilterCategory, option: string) => {
        set_filters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [option]: !(prevFilters[category] as Record<string, boolean>)[option],
            },
        }));

        setApplyFilters(false);

        Object.values(filters).forEach((category) => Object.values(category).forEach((isActive) => isActive && setApplyFilters(true)));
    };

    const [applyFilters, setApplyFilters] = useState<boolean>(false);

    // Filter logic
    const getActiveFilters = () => {
        const active = {
            brands: Object.entries(filters.brands)
                .filter(([, isActive]) => isActive)
                .map(([brand]) => brand),
            movement: Object.entries(filters.movement)
                .filter(([, isActive]) => isActive)
                .map(([m]) => m),
            condition: Object.entries(filters.condition)
                .filter(([, isActive]) => isActive)
                .map(([c]) => c),
            size: Object.entries(filters.size)
                .filter(([, isActive]) => isActive)
                .map(([s]) => s),
            material: Object.entries(filters.watchMaterial)
                .filter(([, isActive]) => isActive)
                .map(([m]) => m),
            color: Object.entries(filters.color)
                .filter(([, isActive]) => isActive)
                .map(([c]) => c),
        };
        return active;
    };

    const filteredWatches = dummyWatches.filter((watch) => {
        const active = getActiveFilters();

        if (active.brands.length == 0 && active.movement.length == 0 && active.condition.length == 0 && active.size.length == 0 && active.material.length == 0 && active.color.length == 0) return true;

        if (!active.brands.includes(watch.brand)) return false;
        if (!active.movement.includes(watch.movement)) return false;
        if (!active.condition.includes(watch.condition)) return false;
        if (!active.size.includes(watch.size)) return false;
        if (!active.material.includes(watch.material)) return false;
        if (!active.color.includes(watch.color)) return false;

        return true;
    });

    return (
        <section className="w-full flex flex-col items-center justify-start gap-12 py-20 px-4 sm:px-8">
            <div className="w-full max-w-dvw flex flex-col gap-10">
                <div className="relative w-full h-65 sm:h-80  overflow-hidden">
                    <Image src={"/shopBanner.webp"} fill alt="banner" className="overflow-hidden " />

                    <div className="relative min-h-65 sm:min-h-80">
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-8 sm:p-12">
                            <span className="text-sm uppercase tracking-[0.4em] opacity-80 font-medium">Watches</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-secondary tracking-wide">Find your next signature timepiece</h1>
                            <p className="max-w-3xl text-sm sm:text-base leading-7 text-white/75">Our watch experts provide professional assistance for the purchase or sale of new/pre-owned luxury timepieces.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-10">
                    <aside className="flex flex-col gap-6 w-fit">
                        <Dropdown
                            titles="Brands"
                            children={["Rolex", "Patek Philippe", "Cartier", "Audemars Piguet", "Omega", "IWC", "Jaeger-LeCoultre"].map((brand) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={brand} onClick={() => handleFilterChange("brands", brand)}>
                                    <CheckBox label={brand} active={filters.brands[brand as keyof typeof filters.brands]} />
                                </div>
                            ))}
                        />
                        <Dropdown
                            titles="Movement"
                            children={["Automatic", "Manual", "Hybrid"].map((movement) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={movement} onClick={() => handleFilterChange("movement", movement)}>
                                    <CheckBox label={movement} active={filters.movement[movement as keyof typeof filters.movement]} />
                                </div>
                            ))}
                        />
                        <Dropdown
                            titles="Condition"
                            children={["New", "Pre-Owned"].map((condition) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={condition} onClick={() => handleFilterChange("condition", condition)}>
                                    <CheckBox label={condition} active={filters.condition[condition as keyof typeof filters.condition]} />
                                </div>
                            ))}
                        />
                        <Dropdown
                            titles="Case Size"
                            children={["Small", "Medium", "Large"].map((size) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={size} onClick={() => handleFilterChange("size", size)}>
                                    <CheckBox label={size} active={filters.size[size as keyof typeof filters.size]} />
                                </div>
                            ))}
                        />
                        <Dropdown
                            titles="Watch Material"
                            children={["Stainless Steel", "Titanium", "Gold", "Platinum"].map((material) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={material} onClick={() => handleFilterChange("watchMaterial", material)}>
                                    <CheckBox label={material} active={filters.watchMaterial[material as keyof typeof filters.watchMaterial]} />
                                </div>
                            ))}
                        />
                        <Dropdown
                            titles="Dial Color"
                            children={["Black", "White", "Blue", "Green"].map((color) => (
                                <div className="w-full flex justify-between items-center cursor-pointer text-[14px]" key={color} onClick={() => handleFilterChange("color", color)}>
                                    <CheckBox label={color} active={filters.color[color as keyof typeof filters.color]} />
                                </div>
                            ))}
                        />
                    </aside>

                    <main className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="w-full max-w-xl">
                                <label htmlFor="shop-search" className="mb-2 block text-sm font-semibold">
                                    Search
                                </label>
                                <input id="shop-search" type="text" placeholder="Search watches..." className="w-full border-b  bg-transparent py-3 text-sm outline-none" />
                            </div>
                            <div className="flex w-full max-w-sm items-center gap-3 sm:justify-end">
                                <label htmlFor="sortMethod" className="text-sm font-semibold">
                                    Sort
                                </label>
                                <select id="sortMethod" className="flex-1  bg-transparent text-sm outline-none">
                                    <option>Newest</option>
                                    <option>Price low-high</option>
                                    <option>Price high-low</option>
                                    <option>Brand</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredWatches.length > 0 ? (
                                filteredWatches.map((watch) => (
                                    <article key={watch.id} className="group overflow-hidden  border border-[#e9e9e9] bg-white shadow-sm transition-default hover:-translate-y-1">
                                        <div className="aspect-4/3 bg-slate-100 flex items-center justify-center text-sm text-slate-500">[Watch Image]</div>
                                        <div className="p-5">
                                            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{watch.brand}</span>
                                            <h3 className="mt-3 text-lg font-semibold text-foreground">{watch.name}</h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{watch.description}</p>
                                            <div className="mt-3 space-y-1 text-xs text-slate-500">
                                                <p>
                                                    Movement: {watch.movement} • Size: {watch.size}
                                                </p>
                                                <p>
                                                    Material: {watch.material} • Condition: {watch.condition}
                                                </p>
                                            </div>
                                            <div className="mt-5 flex items-center justify-between gap-4">
                                                <span className="text-base font-semibold text-foreground">€{watch.price.toLocaleString()}</span>
                                                <button type="button" className=" border  px-5 py-3 text-sm font-semibold transition-default hover:bg-slate-50">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-slate-500">No watches match your filters. Try adjusting your selection.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}
