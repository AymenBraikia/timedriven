import Link from "next/link";
import dynamic from "next/dynamic";
import FadeInObserver from "./components/fade_wrapper";

const Hero = dynamic(() => import("./components/hero"), { ssr: true });
const New = dynamic(() => import("./components/new"), { ssr: true });
const Iconic = dynamic(() => import("./components/iconic"), { ssr: true });
const Services = dynamic(() => import("./components/services"), { ssr: true });
const Booking = dynamic(() => import("./components/booking"), { ssr: true });

export default function Body() {
	return (
		<div className="flex-col flex-center w-full">
			<Hero />
			
			<div className="mt-[100dvh] flex-col flex-center w-full bg-background">
				<New />
				
				{/* The wrapper handles the visibility hook; the content inside is server-rendered */}
				<FadeInObserver>
					<div className="flex-center flex-col md:flex-row h-100 gap-5 md:h-50 md:gap-20 overflow-hidden text-center relative">
						<p className="text-6xl tracking-wider">Get Inspired</p>
						<div className="md:h-full md:w-0.5 w-full h-1 bg-foreground"></div>
						<div className="text-xl flex flex-col gap-8 h-1/2">
							<p className="max-w-100 wrap-break-word tracking-wide leading-8">
								Your journey begins here. Take a minute to answer these questions, and we’ll help you figure out what your first step should be.
							</p>
							<Link aria-label="Begin your journey" className="underline" href={"#"}>
								Begin
							</Link>
						</div>
					</div>
				</FadeInObserver>

				{/* You can wrap these components individually if they should fade in separately */}
				<Iconic />
				<Services />
				<Booking />
			</div>
		</div>
	);
}