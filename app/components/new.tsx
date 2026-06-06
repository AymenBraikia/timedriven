"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const data = [
	{ price: 22900, src: "/new/rolex_daytona.webp", name: "Rolex Daytona" },
	{ price: 24990, src: "/new/Patek Philippe Calatrava.webp", name: "Patek Philippe Calatrava" },
	{ price: 15990, src: "/new/Cartier Panthere.webp", name: "Cartier Panthere" },
	{ price: 33900, src: "/new/Rolex Submariner Date 40.webp", name: "Rolex Submariner Date 40" },
	{ price: 18990, src: "/new/Rolex Sky-Dweller.webp", name: "Rolex Sky-Dweller" },
	{ price: 6290, src: "/new/Rolex Datejust 36.webp", name: "Rolex Datejust 36" },
	{ price: 5990, src: "/new/Rolex Datejust.webp", name: "Rolex Datejust" },
	{ price: 4990, src: "/new/Rolex Oyster Perpetual 26.webp", name: "Rolex Oyster Perpetual 26" },
];

export default function New() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);
	const [view, set_view] = useState<null | { price: number; src: string; name: string }>(null);

	useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(window.scrollY));
		setTimeout(() => set_dvh(window.innerHeight), 0);
	}, []);

	const bg = useRef<HTMLDivElement>(null);

	return (
		<section className="flex-col justify-center items-start p-16 w-dvw">
			<h1 className={`text-5xl font-secondary tracking-wide ${scroll_y > 200 ? "fade-in" : "fade-out"}`}>
				New <br />
				Arrivals
			</h1>
			<br />
			<p className={`${scroll_y > 200 ? "fade-in" : "fade-out"}`}>Our curated collection of pre-owned and new watches is waiting for you.</p>
			<br />
			<Link href={"#"} className={`underline ${scroll_y > 200 ? "fade-in" : "fade-out"}`}>
				View all watches
			</Link>
			<div className={`my-5 ${scroll_y > dvh * 0.7 ? "fade-in" : "fade-out"}`}>
				<List display={4}>
					{data.map((d, i) => (
						<Link href={"#"} className="h-150 w-110 flex flex-col justify-start items-start transition-long group" key={i}>
							<div className="relative w-full h-4/5 flex-center overflow-hidden">
								<Image src={d.src} sizes="(maxWidth: 100dvw) 100vw, 100dvw" fill alt={d.name} className="object-cover select-none scale-100 brightness-100 transition-long group-hover:scale-105 group-hover:brightness-50" />
								<div className="relative w-full h-15 fade-out group-hover:fade-in transition-long flex-center gap-4 z-10">
									<button className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default h-full" onClick={() => set_view(d)}>
										QUICK VIEW
									</button>
									<button className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default aspect-square h-full text-3xl flex-center">+</button>
								</div>
							</div>
							<h5 className="title5">{d.name}</h5>
							<h6 className="title6">{format(d.price)}</h6>
						</Link>
					))}
				</List>
			</div>
			{view && (
				<div ref={bg} className={`fixed left-0 top-0 w-dvw h-dvh bg-black/50 ${view ? "fade-in flex-center z-10" : "fade-out hidden"}`} onClick={(e) => e.target == bg.current && set_view(null)}>
					<div className="w-3/5 h-150 min-h-100 p-16 flex-center gap-16 font-secondary bg-background relative">
						<div className="relative w-1/2 h-full ">
							<Image src={view.src} sizes="(maxWidth: 100dvw) 100vw, 100dvw" fill alt={view.name} className="object-cover select-none" />
						</div>
						<div className="flex flex-col justify-between items-start w-1/2 min-h-full">
							<h1 className="title1 tracking-widest">{view.name}</h1>
							<h4 className="title4 tracking-wider">{format(view.price)}</h4>
							<p className="text-secondary leading-8 tracking-wider">An extreme execution of mechanical weight and modern aesthetic layout. Encased in polished lightweight titanium alloys, featuring our caliber 4101 proprietary hand assembly.</p>
							<button className="button w-full">ADD TO CART</button>
						</div>
						<button className="button absolute top-5 right-5" onClick={() => set_view(null)}>
							Close
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

function format(n: number): string {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	}).format(n);
}
