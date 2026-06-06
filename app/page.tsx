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

	useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(scrollY));
	}, []);
	return (
		<div className="flex-col flex-center w-full">
			<Hero />
			<div className="mt-[100dvh] flex-col flex-center w-full bg-background">
				<New />
				<div className={`flex-center h-50 gap-20 overflow-hidden relative ${scroll_y > innerHeight ? "fade-in" : "fade-out"}`}>
					<p className="text-6xl min-w-fit">Get Inspired</p>
					<div className="h-full w-0.5 bg-foreground min-w-fit"></div>
					<div className="text-xl flex flex-col gap-8 min-w-fit">
						<p className="max-w-100 wrap-break-word">Your journey begins here. Take a minute to answer these questions, and we’ll help you figure out what your first step should be.</p>
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
