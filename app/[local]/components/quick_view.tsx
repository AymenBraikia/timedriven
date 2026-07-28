"use client";
import List from "./scrollList";
import { ZoomableImage } from "./elements/zoomableImage";
import AtcBtn from "./buttons/addToCart";
import { Watch } from "@/types/watch";
import { Spare } from "@/types/spare";
import Cross from "./svg/cross";

interface QuickViewProps {
    view: Watch | Spare;
    onClose: () => void;
    format: (n: number) => string;
}

export default function QuickViewModal({ view, onClose, format }: QuickViewProps) {
    return (
        <div className="fixed w-dvw h-dvh left-0 top-0 z-50 bg-black/60" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={`${view.brand} ${view.model} quick view`}
                className="relative sm:pt-30 pt-25 flex w-full h-full flex-col md:flex-row bg-background font-secondary outline-none flex-center"
            >
                <button aria-label="Close quick view" type="button" className="button absolute top-34 right-4 z-20 p-0" onClick={onClose}>
                    <Cross classnames="w-10"/>
                </button>

                <div className="w-full max-w-100 sm:max-w-full md:max-w-auto md:w-1/2 sm:px-15 flex-center">
                    <List display={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                        {view.images.map((url, index) => (
                            <div key={`${url}-${index}`} className="relative w-full aspect-square sm:aspect-video md:aspect-square">
                                <ZoomableImage src={url} alt={view.slug} />
                            </div>
                        ))}
                    </List>
                </div>

                <div className="flex w-full md:w-1/2 flex-col justify-center px-4 md:px-8 gap-2 md:h-full md:gap-6">
                    <div className="flex flex-col gap-1 md:gap-2">
                        <p className="font-semibold tracking-tight capitalize text-2xl sm:text-3xl lg:text-4xl">{view.brand}</p>
                        <p className="tracking-wide capitalize text-secondary text-lg sm:text-xl lg:text-2xl">{view.model}</p>
                        <p className="font-medium tracking-wide text-xl sm:text-2xl">{format(view.price)}</p>

                        <div className="hidden md:flex flex-col gap-2 leading-relaxed tracking-wide text-sm text-secondary">
                            <p>Movement: {view.movement}</p>
                            <p>Case Material: {view.caseMaterial}</p>
                            <p>Bracelet Material: {view.braceletMaterial}</p>
                            <p>Condition: {view.condition}</p>
                            <p>Color: {view.dialColor}</p>
                            <p>Case Diameter: {view.caseDiameterMm}mm</p>
                            <p>Year: {view.year}</p>
                            <p>Water Resistence: {view.waterResistanceM}m</p>
                        </div>

                        <p className="text-secondary md:text-primary leading-relaxed tracking-wide text-xs sm:text-sm md:text-base">{view.description}</p>
                    </div>

                    <div className="w-full pt-2">
                        <AtcBtn reference={view.reference} />
                    </div>
                </div>
            </div>
        </div>
    );
}
