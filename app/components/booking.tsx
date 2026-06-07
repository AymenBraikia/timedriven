"use client";
import Image from "next/image";
import Link from "next/link";
import booking_img from "../../public/book.webp";
import { useEffect, useState } from "react";

export default function Booking() {
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
		<div className={`w-full h-125 relative flex-center flex-col text-center text-white select-none font-secondary gap-4 ${scroll_y > dvh * 3.5 ? "fade-in" : "fade-out"}`}>
			<Image src={booking_img} alt="booking.webp" sizes="(maxWidth: 100dvw) 100vw, 100dvw" className="object-cover object-center select-none brightness-30" fill></Image>
			<p className="z-10 sm:text-5xl text-4xl tracking-wider">Book an Appointment</p>
			<p className="z-10 sm:text-2xl text-xl tracking-wide leading-8">As experts, we give you our professional opinion on any matter you may have.</p>
			<Link className="z-10 sm:text-3xl text-2xl underline" href={"#"}>
				Book now
			</Link>
		</div>
	);
}
