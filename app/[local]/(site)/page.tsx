import Link from "next/link";
import dynamic from "next/dynamic";
import FadeInObserver from "@/app/components/fade_wrapper";

const Hero = dynamic(() => import("@/app/components/hero"), { ssr: true });
const New = dynamic(() => import("@/app/components/new"), { ssr: true });
const Iconic = dynamic(() => import("@/app/components/iconic"), { ssr: true });
const Services = dynamic(() => import("@/app/components/services"), { ssr: true });
const Booking = dynamic(() => import("@/app/components/booking"), { ssr: true });

export default function Body() {
    return (
        <div className="flex-col flex-center w-full">
            <Hero />

            <div className="mt-[100dvh] flex-col flex-center w-full bg-background z-10">
                <New />

                <FadeInObserver>
                    <div className="flex-center flex-col md:flex-row h-100 gap-5 md:h-50 md:gap-20 overflow-hidden text-center relative">
                        <p className="text-6xl mr-[0.05rem] tracking-wider">Get Inspired</p>
                        <div className="md:h-full md:w-0.5 w-full h-1 bg-foreground"></div>
                        <div className="text-xl flex flex-col gap-8 h-1/2 font-secondary">
                            <p className="max-w-100 wrap-break-word mr-[0.025rem] tracking-wide leading-8">Your journey begins here. Take a minute to answer these questions, and we’ll help you figure out what your first step should be.</p>
                            <Link aria-label="Begin your journey" className="underline" href={"#"}>
                                Begin
                            </Link>
                        </div>
                    </div>
                </FadeInObserver>

                <Iconic />
                <Services />
                <Booking />
            </div>
        </div>
    );
}
