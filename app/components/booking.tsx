"use client";
import Image from "next/image";
import Link from "next/link";
import booking_img from "../../public/book.webp";
import { useEffect, useState } from "react";

export default function Booking() {
	const [scroll_y, set_scroll_y] = useState<number>(0);
	const [dvh, set_dvh] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(window.scrollY));
		setTimeout(() => set_dvh(window.innerHeight), 0);
	}, []);
	return (
		<div className={`w-full h-125 relative flex-center flex-col text-white select-none font-secondary gap-4 ${scroll_y > dvh * 3.5 ? "fade-in" : "fade-out"}`}>
			<Image src={booking_img} alt="booking.webp" sizes="(maxWidth: 100dvw) 100vw, 100dvw" className="object-cover object-center select-none brightness-30" fill></Image>
			<p className="z-10 text-5xl">Book an Appointment</p>
			<p className="z-10 text-2xl">As experts, we give you our professional opinion on any matter you may have.</p>
			<Link className="z-10 text-3xl underline" href={"#"}>
				Book now
			</Link>
		</div>
	);
}
