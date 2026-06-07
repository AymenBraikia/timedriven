"use client";
import Image from "next/image";
import Link from "next/link";
import services_src from "../../public/polish.webp";
import sell_src from "../../public/sell.webp";
import spare_src from "../../public/spare.webp";
import { useEffect, useState } from "react";

export default function Services() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);

	useEffect(() => {
		const handlescroll = () => set_scroll_y(window.scrollY);
		window.addEventListener("scroll", handlescroll, { passive: true });
		const timer = setTimeout(() => set_dvh(window.innerHeight), 0);
		return () => {
			clearTimeout(timer);
			removeEventListener("scroll", handlescroll);
		};
	}, []);
	return (
		<div className={`w-full h-fit flex-center gap-8 flex-col sm:flex-row p-4 py-20 sm:p-0 ${scroll_y > dvh * 2.7 ? "fade-in" : "fade-out"}`}>
			<Link href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
				<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
					<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={sell_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
				</div>
				<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
					<h4 className="title4">Sell / Consign</h4>
					<h5 className="underline title5">Learn more</h5>
				</div>
			</Link>
			<Link href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
				<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
					<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={spare_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
				</div>
				<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
					<h4 className="title4">Spare Parts</h4>
					<h5 className="underline title5">Go to shop</h5>
				</div>
			</Link>
			<Link href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
				<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
					<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={services_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
				</div>
				<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
					<h4 className="title4">Polishing & Services</h4>
					<h5 className="underline title5">Learn more</h5>
				</div>
			</Link>
		</div>
	);
}
