"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useEffect, useState } from "react";

const data = [
	{ price: 22900, src: "/new/rolex_daytona.webp", name: "Rolex Daytona" },
	{ price: 24990, src: "/new/Patek Philippe Calatrava.webp", name: "Patek Philippe Calatrava" },
	{ price: 15990, src: "/new/Cartier Panthere.webp", name: "Cartier Panthere" },
	{ price: 33900, src: "/new/Rolex Submariner Date 40.webp", name: "Rolex Submariner Date 40" },
	{ price: 18990, src: "/new/Rolex Sky-Dweller.webp", name: "Rolex Sky-Dweller" },
	{ price: 6290, src: "/new/Rolex Datejust 36.webp", name: "Rolex Datejust 36" },
	{ price: 5990, src: "/new/Rolex Datejust.webp", name: "Rolex Datejust" },
	{ price: 4990, src: "/new/Rolex Oyster Perpetual 26.webp", name: "Rolex Oyster Perpetual 26" },
	{ price: 5990, src: "/new/Rolex Datejust2.webp", name: "Rolex Datejust" },
	{ price: 9990, src: "/new/Cartier Panthere2.webp", name: "Cartier Panthere" },
];

export default function New() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(window.scrollY));
		setTimeout(() => set_dvh(window.innerHeight), 0);
	}, []);

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
						<Link href={"#"} className="h-150 w-110 flex flex-col justify-start items-start" key={i}>
							<div className="relative w-full h-4/5">
								<Image src={d.src} sizes="(maxWidth: 100dvw) 100vw, 100dvw" fill alt={d.name} className="object-contain select-none" />
							</div>
							<h5 className="title5">{d.name}</h5>
							<h6 className="title6">{format(d.price)}</h6>
						</Link>
					))}
				</List>
			</div>
		</section>
	);
}

function format(n: number): string {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	}).format(n);
}
