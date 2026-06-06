"use client";
import Link from "next/link";
import List from "./scrollList";
import Image from "next/image";
import { useEffect, useState } from "react";

const data = [
	{ src: "/brands/Audemars Piguet.webp", name: "Audemars Piguet" },
	{ src: "/brands/breitling.webp", name: "breitling" },
	{ src: "/brands/cartier.webp", name: "Cartier" },
	{ src: "/brands/iwc.webp", name: "IWC" },
	{ src: "/brands/omega.webp", name: "Omega" },
	{ src: "/brands/patek phillip.webp", name: "Patek Phillip" },
	{ src: "/brands/Rolex Oyster Perpetual 26.webp", name: "Rolex" },
	{ src: "/brands/zenith.webp", name: "Zenith" },
];

export default function Iconic() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(window.scrollY));
		setTimeout(() => set_dvh(window.innerHeight), 0);
	}, []);
	return (
		<section className="flex-col justify-center items-start p-16 w-dvw">
			<h1 className={`text-5xl font-secondary tracking-wide ${scroll_y > dvh * 1.6 ? "fade-in" : "fade-out"}`}>
				Iconic <br />
				Brands
			</h1>
			<br />
			<p className={`${scroll_y > dvh * 1.6 ? "fade-in" : "fade-out"}`}>
				Browse our collection of classic wrist watches from world-renowned <br />
				watchmakers.
			</p>

			<div className={`my-5 font-secondary ${scroll_y > dvh * 2 ? "fade-in" : "fade-out"}`}>
				<List display={3}>
					{data.map((d, i) => (
						<Link href={"#"} style={{ width: `calc(${100}% - 16px)` }} className="h-100 flex flex-col justify-start items-start relative" key={i}>
							<div className="relative w-full h-full transition brightness-80 hover:brightness-100 overflow-hidden group">
								<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={d.src} fill alt={d.name} className="object-cover object-center select-none transition scale-100 hover:scale-110" />
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
