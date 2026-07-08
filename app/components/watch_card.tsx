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
    size: string;
    material: string;
    condition: string;
    price: number;
    image_src: string;
}) {

    return (
        <div className="group overflow-hidden transition-default hover:-translate-y-1 cursor-pointer">
            <div className="aspect-4/3 relative w-full">
                <Image src={image_src} alt={image_src} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 40vw" className="group-hover:brightness-100 brightness-80 transition-default" />
            </div>
            <div className="py-4 flex flex-col justify-start items-start gap-3 min-h-50">
                <span className="text-xs uppercase tracking-[0.3em] text-secondary">{brand}</span>
                <h4 className="font-semibold">{name}</h4>
                <p className="leading-6">{description}</p>
                <div className="space-y-1 text-xs text-secondary">
                    <p>
                        Movement: {movement} • Size: {size}
                    </p>
                    <p>
                        Material: {material} • Condition: {condition}
                    </p>
                </div>
                <span className="text-base font-semibold text-foreground">€{price.toLocaleString()}</span>
            </div>
        </div>
    );
}
