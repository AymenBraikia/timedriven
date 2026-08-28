import { Suspense } from "react";
import Hero from "@/app/components/hero";
import New from "@/app/components/new";
import Inspired from "@/app/components/inspired";
import Iconic from "@/app/components/iconic";
import Services from "@/app/components/services";
import Booking from "@/app/components/booking";
import get_new from "@/app/server/get_new";

async function NewArrivals() {
    const watches = await get_new();
    return <New watches={watches} />;
}

export default function Home() {
    return (
        <div className="flex-col flex-center w-full">
            <Hero />

            <div className="mt-[100dvh] flex-col flex-center w-full bg-background z-10">
                <Suspense fallback={<div className="w-dvw sm:p-16 p-4 py-8 min-h-150" />}>
                    <NewArrivals />
                </Suspense>
                <Inspired />
                <Iconic />
                <Services />
                <Booking />
            </div>
        </div>
    );
}
