// app/not-found.tsx
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex-center py-10">
            <div className="relative aspect-video w-dvw">
                <div className="absolute top-1/7 right-1/8 flex justify-center items-start flex-col fade-in p-8 max-w-150 liquid-glass">
                    <h1>404 Not Found</h1>
                    <h5 className="font-secondary">Time Has Run Out for This Page</h5>
                    <p className="mt-2 text-secondary">The page or timepiece you are searching for has been moved, renamed, or no longer exists.</p>
                    <div className="flex gap-4">
                        <Link href="/" className="mt-4 px-4 py-2 button capitalize">
                            explore our collection
                        </Link>
                        <Link href="/" className="mt-4 px-4 py-2 button2 capitalize">
                            return home
                        </Link>
                    </div>
                </div>
                <Image fill alt="not Found" src={"/notFound.jpg"} sizes="100dvw" className="object-cover object-center -z-10 brightness-80" />
            </div>
        </div>
    );
}
