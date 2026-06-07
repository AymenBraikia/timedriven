"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useEffect, useState } from "react";

let id = 0;
const data = [
	{ id: id++, src: "/brands/Audemars Piguet.webp", name: "Audemars Piguet" },
	{ id: id++, src: "/brands/breitling.webp", name: "breitling" },
	{ id: id++, src: "/brands/cartier.webp", name: "Cartier" },
	{ id: id++, src: "/brands/iwc.webp", name: "IWC" },
	{ id: id++, src: "/brands/omega.webp", name: "Omega" },
	{ id: id++, src: "/brands/patek phillip.webp", name: "Patek Phillip" },
	{ id: id++, src: "/brands/Rolex Oyster Perpetual 26.webp", name: "Rolex" },
	{ id: id++, src: "/brands/zenith.webp", name: "Zenith" },
];

export default function Iconic() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);
	const [dvw, set_dvw] = useState<number>(0);

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
	return (
		<section className="flex-col justify-center items-start sm:p-16 p-4 w-dvw">
			<h1 className={`text-5xl font-secondary tracking-wide ${scroll_y > dvh * 1.6 ? "fade-in" : "fade-out"}`}>
				Iconic <br />
				Brands
			</h1>
			<br />
			<p className={`${scroll_y > dvh * 1.6 ? "fade-in" : "fade-out"}`}>
				Browse our collection of classic wrist watches from world-renowned <br className="sm:block hidden" />
				watchmakers.
			</p>

			<div className={`my-5 font-secondary ${scroll_y > dvh * 2 ? "fade-in" : "fade-out"}`}>
				<List display={dvw < 640 ? 1 : 3}>
					{data.map((d) => (
						<Link href={"#"} className={`h-100 sm:w-[calc(100%-16px)] w-full flex flex-col justify-start items-start relative`} key={d.id}>
							<div className="relative w-full h-full transition-long brightness-80 hover:brightness-100 overflow-hidden group">
								<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={d.src} fill alt={d.name} className="object-cover object-center select-none transition-long scale-100 hover:scale-105" />
								<div className="absolute bottom-0 left-0 translate-y-1/2 w-full h-20 blur-[25px] bg-black group-hover:opacity-0 opacity-100 transition-all duration-300 ease-in-out"></div>
							</div>
							<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-white">
								<h4 className="title4">{d.name}</h4>
								<h5 className="underline title5">View all watches</h5>
							</div>
						</Link>
					))}
				</List>
			</div>
		</section>
	);
}
