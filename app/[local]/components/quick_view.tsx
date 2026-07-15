"use client";
import Image from "next/image";
import { useCart } from "../(site)/context/cartContext";
import List from "./scrollList";
import { ZoomableImage } from "./elements/zoomableImage";

interface QuickViewProps {
    view: { price: number; src: string[]; name: string; id: number | string };
    onClose: () => void;
    format: (n: number) => string;
}

export default function QuickViewModal({ view, onClose, format }: QuickViewProps) {
    const { addToCart } = useCart();

    return (
        <div tabIndex={0} role="dialog" className="fixed left-0 top-0 w-dvw h-dvh bg-black/50 fade-in flex-center z-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full h-[calc(100%-100px)] translate-y-12.5 p-4 lg:translate-y-0 lg:w-3/5 lg:h-150 lg:min-h-100 lg:p-16 flex-center flex-col lg:flex-row gap-16 font-secondary bg-background relative">
                <div className="w-full h-1/2 lg:w-1/2 lg:h-full">
                    <List display={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                        {view.src.map((url) => (
                            <div className="relative w-full h-full">
                                <ZoomableImage src={url} alt={view.name} />
                            </div>
                        ))}
                    </List>
                </div>
                <div className="flex flex-col justify-between items-start w-full h-1/2 lg:w-1/2 lg:h-full">
                    <h1 className="lg:title1 lg:mr-[0.1rem] title4 mr-[0.05rem] tracking-wider">{view.name}</h1>
                    <h4 className="lg:title4 lg:mr-[0.05rem] lg:tracking-wider title5 mr-[0.025rem] tracking-wide">{format(view.price)}</h4>
                    <p className="text-secondary leading-8 mr-[0.05rem] tracking-wider">
                        An extreme execution of mechanical weight and modern aesthetic layout. Encased in polished lightweight titanium alloys, featuring our caliber 4101 proprietary hand assembly.
                    </p>
                    <button onClick={() => addToCart(view)} aria-label="add to cart" type="button" className="button w-full">
                        ADD TO CART
                    </button>
                </div>
                <button aria-label="close" type="button" className="button absolute top-5 right-5" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
