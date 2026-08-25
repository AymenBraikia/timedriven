"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Banner({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    return (
        <div className="relative w-full h-65 sm:h-80  overflow-hidden mt-5">
            <Image src={resolvedTheme == "dark" ? "/shopBanner.webp" : "/shopBanner_white.png"} fill alt="banner" className="overflow-hidden " />

            <div className="relative min-h-65 sm:min-h-80">
                <div className={`absolute inset-0  dark:bg-black/60 not-dark:hidden `} />
                <div className="relative z-10 h-full min-h-65 sm:min-h-80 flex flex-col items-start justify-center gap-5 p-8 sm:p-12 text-primary">
                    {/* {resolvedTheme == "dark" ? children : <div className="p-4 bg-white/80">{children}</div>} */}
                    {children}
                </div>
            </div>
        </div>
    );
}
