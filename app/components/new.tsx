"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useState } from "react";
import FadeInObserver from "./fade_wrapper";
import dynamic from "next/dynamic";
import { useCart } from "./cartContext";

const QuickViewModal = dynamic(() => import("./quick_view"), {
	ssr: false,
});

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
	const [view, set_view] = useState<null | { price: number; src: string; name: string; id: number }>(null);
	const { addToCart } = useCart();

	return (
		<section className="flex flex-col justify-center items-start p-16 w-dvw gap-6" id="new">
			<div className="w-fit flex justify-center items-start flex-col">
				<FadeInObserver>
					<h1 className={`text-5xl font-secondary mr-[0.025rem] tracking-wide`}>
						New <br />
						Arrivals
					</h1>
				</FadeInObserver>
			</div>
			<div className="w-fit flex justify-center items-start flex-col">
				<FadeInObserver>
					<p>Our curated collection of pre-owned and new watches is waiting for you.</p>
				</FadeInObserver>
			</div>
			<div className="w-fit flex justify-center items-start flex-col">
				<FadeInObserver>
					<Link aria-label="view all watches" href={"#"} className={`underline`}>
						View all watches
					</Link>
				</FadeInObserver>
			</div>
			<FadeInObserver>
				<div className={`w-[95dvw] sm-w-fit`}>
					<List display={{ base: 1, sm: 2, md: 2, lg: 4 }}>
						{data.map((d) => (
							<Link aria-label={`${d.name}`} href={"#"} className="aspect-2/3 sm:aspect-auto sm:h-110 w-full flex flex-col justify-start items-start transition-long group" key={d.id} onClick={() => innerWidth < 640 && set_view(d)}>
								<div className="relative w-full h-9/10 sm:h-4/5 flex-center overflow-hidden">
									<Image src={d.src} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 50vw" fill alt={d.name} className="object-contain select-none scale-100 brightness-100 transition-long group-hover:scale-105 group-hover:brightness-50" />
									<div className="sm:flex-center relative w-full h-15 fade-out group-hover:fade-in transition-long hidden gap-4 z-10">
										<button aria-label={`quick view ${d.name}`} type="button" className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default h-full" onClick={() => set_view(d)}>
											QUICK VIEW
										</button>
										<button
											onClick={() => addToCart(d)}
											aria-label="add to cart"
											type="button"
											className="cursor-pointer p-4 active:scale-95 select-none text-white bg-transparent hover:bg-black transition-default aspect-square h-full text-3xl flex-center"
										>
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
			</FadeInObserver>
			{view && <QuickViewModal view={view} onClose={() => set_view(null)} format={format} />}
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
