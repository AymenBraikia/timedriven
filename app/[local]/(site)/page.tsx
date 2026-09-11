import { Suspense } from "react";
import Hero from "@/app/components/hero";
import New from "@/app/components/new";
import Inspired from "@/app/components/inspired";
import Iconic from "@/app/components/iconic";
import Services from "@/app/components/services";
import Booking from "@/app/components/booking";
import Note from "../components/note";
import NewLoader from "../components/loaders/new";

export default function Home() {
    return (
        <div className="flex-col flex-center w-full">
            <Hero />

            <div className="mt-[100dvh] flex-col flex-center w-full bg-background z-10">
                <Suspense fallback={<NewLoader />}>
                    <New />
                </Suspense>
                <Inspired />
                <Iconic />
                <Services />
                <Booking />
            </div>
            <Note one_time={true} />
        </div>
    );
}
