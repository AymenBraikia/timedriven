import Image from "next/image";
import Link from "next/link";
import booking_img from "../../public/book.webp"

export default function Booking() {
	return (
		<div className="w-full h-125 relative flex-center flex-col text-white select-none font-secondary gap-4">
			<Image src={booking_img} alt="booking.webp" sizes="(maxWidth: 100dvw) 100vw, 100dvw" className="object-cover object-center select-none brightness-30" fill></Image>
			<p className="z-10 text-5xl">Book an Appointment</p>
			<p className="z-10 text-2xl">As experts, we give you our professional opinion on any matter you may have.</p>
			<Link className="z-10 text-3xl underline" href={"#"}>
				Book now
			</Link>
		</div>
	);
}
