import Image from "next/image";
import Link from "next/link";
import booking_img from "../../../public/book.webp";
import FadeInObserver from "./fade_wrapper";

export default function Booking() {
    return (
        <FadeInObserver>
            <div className={`w-full h-125 my-20 relative flex-center flex-col text-center text-white select-none font-secondary gap-4`}>
                <Image src={booking_img} alt="booking.webp" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 100vw" className="object-cover object-center select-none brightness-30" fill></Image>
                <p className="z-10 sm:text-5xl text-4xl mr-[0.05rem] tracking-wider">Book an Appointment</p>
                <p className="z-10 sm:text-2xl text-xl mr-[0.025rem] tracking-wide leading-8">As experts, we give you our professional opinion on any matter you may have.</p>
                <Link aria-label="Book Now" className="z-10 sm:text-3xl text-2xl underline" href={"/booking"}>
                    Book now
                </Link>
            </div>
        </FadeInObserver>
    );
}
