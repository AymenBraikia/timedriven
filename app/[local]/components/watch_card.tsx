"use client";

import Image from "next/image";

export default function Watch_card({
    brand,
    name,
    description,
    movement,
    size,
    material,
    condition,
    price,
    image_src,
}: {
    brand: string;
    name: string;
    description: string;
    movement: string;
    size: number;
    material: string;
    condition: string;
    price: number;
    image_src: string;
}) {
    return (
        <div className="group overflow-hidden transition-default hover:-translate-y-1 cursor-pointer font-secondary sm:px-0 px-4 w-full">
            <div className="sm:aspect-4/3 aspect-4/3 relative w-full">
                <Image src={image_src} alt={image_src} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 40vw" className="group-hover:brightness-100 brightness-80 transition-default" />
            </div>
            <div className="py-4 flex flex-col justify-start items-start gap-3 min-h-50">
                <span className="text-xs uppercase tracking-[0.3em] text-secondary">{brand}</span>
                <h4 className="font-semibold capitalize">{name}</h4>
                <p className="leading-6">{description}</p>
                <div className="space-y-1 text-sm text-secondary">
                    <p>Movement: {movement}</p>
                    <p>Size: {size} mm</p>
                    <p>Material: {material}</p>
                    <p>Condition: {condition}</p>
                </div>
                <span className="text-xl font-semibold text-foreground font-sans">{format(price)}</span>
            </div>
        </div>
    );
}


const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
function format(n: number): string {
    return intl.format(n);
}
