import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/app/components/hero"), { ssr: true });
const New = dynamic(() => import("@/app/components/new"), { ssr: true });
const Inspired = dynamic(() => import("@/app/components/inspired"), { ssr: true });
const Iconic = dynamic(() => import("@/app/components/iconic"), { ssr: true });
const Services = dynamic(() => import("@/app/components/services"), { ssr: true });
const Booking = dynamic(() => import("@/app/components/booking"), { ssr: true });

export default function Body() {
    return (
        <div className="flex-col flex-center w-full">
            <Hero />

            <div className="mt-[100dvh] flex-col flex-center w-full bg-background z-10">
                <New />
                <Inspired />
                <Iconic />
                <Services />
                <Booking />
            </div>
        </div>
    );
}
