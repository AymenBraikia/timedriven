import Image from "next/image";

export default function Banner({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-65 sm:h-80  overflow-hidden">
            <Image src={"/shopBanner.webp"} fill alt="banner" className="overflow-hidden " />

            <div className="relative min-h-65 sm:min-h-80">
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 h-full min-h-65 sm:min-h-80 flex flex-col items-start justify-center gap-5 p-8 sm:p-12">{children} </div>
            </div>
        </div>
    );
}
