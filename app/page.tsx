"use client";
import Link from "next/link";
import Hero from "./components/hero";
import New from "./components/new";
import Iconic from "./components/iconic";
import Services from "./components/services";
import { useEffect, useState } from "react";
import Booking from "./components/booking";

export default function Body() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);

	useEffect(() => {
		const handlescroll = () => set_scroll_y(window.scrollY);
		window.addEventListener("scroll", handlescroll, { passive: true });
		const timer = setTimeout(() => set_dvh(window.innerHeight), 0);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", handlescroll);
		};
	}, []);
	return (
		<div className="flex-col flex-center w-full">
			<Hero />
			<div className="mt-[100dvh] flex-col flex-center w-full bg-background">
				<New />
				<div className={`flex-center flex-col sm:flex-row h-100 gap-5 sm:h-50 sm:gap-20 overflow-hidden text-center relative ${scroll_y > dvh * 1.4 ? "fade-in" : "fade-out"}`}>
					<p className="text-6xl tracking-wider">Get Inspired</p>
					<div className="sm:h-full sm:w-0.5 w-full h-1  bg-foreground"></div>
					<div className="text-xl flex flex-col gap-8 h-1/2">
						<p className="max-w-100 wrap-break-word tracking-wide leading-8">Your journey begins here. Take a minute to answer these questions, and we’ll help you figure out what your first step should be.</p>
						<Link className="underline" href={"#"}>
							Begin
						</Link>
					</div>
				</div>
				<Iconic />
				<Services />
				<Booking />
			</div>
		</div>
	);
}
