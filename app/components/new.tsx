"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

let id = 0;
const data = [
	{ id: id++, price: 22900, src: "/new/rolex_daytona.webp", name: "Rolex Daytona" },
	{ id: id++, price: 24990, src: "/new/Patek Philippe Calatrava.webp", name: "Patek Philippe Calatrava" },
	{ id: id++, price: 15990, src: "/new/Cartier Panthere.webp", name: "Cartier Panthere" },
	{ id: id++, price: 33900, src: "/new/Rolex Submariner Date 40.webp", name: "Rolex Submariner Date 40" },
	{ id: id++, price: 18990, src: "/new/Rolex Sky-Dweller.webp", name: "Rolex Sky-Dweller" },
	{ id: id++, price: 6290, src: "/new/Rolex Datejust 36.webp", name: "Rolex Datejust 36" },
	{ id: id++, price: 5990, src: "/new/Rolex Datejust.webp", name: "Rolex Datejust" },
	{ id: id++, price: 4990, src: "/new/Rolex Oyster Perpetual 26.webp", name: "Rolex Oyster Perpetual 26" },
];

export default function New() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);
	const [dvw, set_dvw] = useState<number>(0);
	const [view, set_view] = useState<null | { price: number; src: string; name: string }>(null);

	useEffect(() => {
		const handlescroll = () => set_scroll_y(window.scrollY);
		window.addEventListener("scroll", handlescroll, { passive: true });
		const timer = setTimeout(() => set_dvh(window.innerHeight), 0);
		const timer2 = setTimeout(() => set_dvw(window.innerWidth), 0);
		return () => {
			clearTimeout(timer);
			clearTimeout(timer2);
			removeEventListener("scroll", handlescroll);
		};
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
			<Link aria-label="view all watches" href={"#"} className={`underline ${scroll_y > 200 ? "fade-in" : "fade-out"}`}>
				View all watches
			</Link>
			<div className={`my-5 w-[90dvw] translate-x-[-10dvw] sm:translate-x-0 sm-w-fit ${scroll_y > dvh * 0.7 ? "fade-in" : "fade-out"}`}>
				<List display={dvw < 640 ? 1 : 4}>
					{data.map((d) => (
						<Link aria-label={`${d.name}`} href={"#"} className="aspect-2/3 sm:aspect-auto sm:h-150 w-full flex flex-col justify-start items-start transition-long group" key={d.id} onClick={() => innerWidth < 640 && set_view(d)}>
							<div className="relative w-full h-9/10 sm:h-4/5 flex-center overflow-hidden">
								<Image src={d.src} sizes="(maxWidth: 100dvw) 100vw, 100dvw" fill alt={d.name} className="object-cover select-none scale-100 brightness-100 transition-long group-hover:scale-105 group-hover:brightness-50" />
								<div className="sm:flex-center relative w-full h-15 fade-out group-hover:fade-in transition-long hidden gap-4 z-10">
									<button aria-label={`quick view ${d.name}`} type="button" className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default h-full" onClick={() => set_view(d)}>
										QUICK VIEW
									</button>
									<button aria-label="add to cart" type="button" className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default aspect-square h-full text-3xl flex-center">
										+
									</button>
								</div>
							</div>
							<h5 className="title5">{d.name}</h5>
							<h6 className="title6">{format(d.price)}</h6>
						</Link>
					))}
				</List>
			</div>
			{view && (
				<div tabIndex={0} role="banner" ref={bg} className={`fixed left-0 top-0 w-dvw h-dvh bg-black/50 ${view ? "fade-in flex-center z-10" : "fade-out hidden"}`} onClick={(e) => e.target == bg.current && set_view(null)}>
					<div className="w-full h-[calc(100%-100px)] translate-y-12.5 p-4 sm:translate-y-0 sm:w-3/5 sm:h-150 sm:min-h-100 sm:p-16 flex-center flex-col sm:flex-row gap-16 font-secondary bg-background relative">
						<div className="relative w-full h-1/2 sm:w-1/2 sm:h-ful ">
							<Image src={view.src} sizes="(maxWidth: 100dvw) 100vw, 100dvw" fill alt={view.name} className="object-cover select-none" />
						</div>
						<div className="flex flex-col justify-between items-start  w-full h-1/2 sm:w-1/2 sm:h-full">
							<h1 className="sm:title1 sm:tracking-widest title4 tracking-wider">{view.name}</h1>
							<h4 className="sm:title4 sm:tracking-wider title5 tracking-wide">{format(view.price)}</h4>
							<p className="text-secondary leading-8 tracking-wider">An extreme execution of mechanical weight and modern aesthetic layout. Encased in polished lightweight titanium alloys, featuring our caliber 4101 proprietary hand assembly.</p>
							<button aria-label="add to cart" type="button" className="button w-full">
								ADD TO CART
							</button>
						</div>
						<button aria-label="close" type="button" className="button absolute top-5 right-5" onClick={() => set_view(null)}>
							Close
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

const intl = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});
function format(n: number): string {
	return intl.format(n);
}
