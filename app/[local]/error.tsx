"use client"
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";

export default function NotFound() {
    return (
        <div className="flex-center py-10">
            <div className="relative aspect-video w-dvw">
                <div className="absolute top-1/7 right-1/8 flex justify-center items-start flex-col fade-in p-8 max-w-150 liquid-glass">
                    <span className="text-xs uppercase tracking-widest font-semibold text-secondary">404 — Page Not Found</span>

                    <h1 className="mt-2 text-2xl md:text-3xl font-secondary font-semibold">Time Has Run Out for This Page</h1>

                    <p className="mt-3 text-secondary text-sm md:text-base leading-relaxed">The page or timepiece you are searching for has been moved, renamed, or no longer exists.</p>

                    <div className="flex gap-4 mt-6">
                        <Link href="/collection" className="button">
                            Explore Our Collection
                        </Link>
                        <Link href="/" className="button2">
                            Return Home
                        </Link>
                    </div>
                </div>

                <Image fill priority alt="Luxury timepiece background" src="/notFound.jpg" sizes="100dvw" className="object-cover object-center -z-10 brightness-80" />
            </div>
        </div>
    );
}
