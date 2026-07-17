"use client";
import List from "./scrollList";
import { ZoomableImage } from "./elements/zoomableImage";
import AtcBtn from "./buttons/addToCart";
import { Watch } from "@/types/watch";
import { Spare } from "@/types/spare";

interface QuickViewProps {
    view: Watch | Spare;
    onClose: () => void;
    format: (n: number) => string;
}

export default function QuickViewModal({ view, onClose, format }: QuickViewProps) {
    return (
        <div tabIndex={0} role="dialog" className="fixed left-0 top-0 w-dvw h-dvh bg-black/50 fade-in flex-center z-50 pt-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full h-[calc(100%-100px)] translate-y-12.5 p-4 lg:translate-y-0 lg:w-3/5 lg:h-150 lg:min-h-100 lg:p-16 flex-center flex-col lg:flex-row gap-16 font-secondary bg-background relative">
                <div className="w-full h-1/2 lg:w-1/2 lg:h-full">
                    <List display={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                        {view.images.map((url) => (
                            <div className="relative w-full h-full">
                                <ZoomableImage src={url} alt={view.slug} />
                            </div>
                        ))}
                    </List>
                </div>
                <div className="flex flex-col justify-between items-start w-full h-1/2 lg:w-1/2 lg:h-full">
                    <h1 className="lg:title1 lg:mr-[0.1rem] title4 mr-[0.05rem] tracking-wider">{view.brand + " " + view.model}</h1>
                    <h4 className="lg:title4 lg:mr-[0.05rem] lg:tracking-wider title5 mr-[0.025rem] tracking-wide">{format(view.price)}</h4>
                    <p className="text-secondary leading-8 mr-[0.05rem] tracking-wider">
                        An extreme execution of mechanical weight and modern aesthetic layout. Encased in polished lightweight titanium alloys, featuring our caliber 4101 proprietary hand assembly.
                    </p>
                    <div className="w-full text-2xl">
                        <AtcBtn reference={view.reference} />
                    </div>
                </div>
                <button aria-label="close" type="button" className="button absolute top-5 right-5" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
