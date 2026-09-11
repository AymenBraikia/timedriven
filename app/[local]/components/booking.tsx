"use client";
import Image from "next/image";
import Link from "next/link";
import booking_img from "../../../public/book.webp";
import FadeInObserver from "./fade_wrapper";
import { useTranslations } from "next-intl";

export default function Booking() {
    const t = useTranslations("home.bookingBanner");
    return (
        <FadeInObserver>
            <div className={`w-full min-h-100 h-125 mt-12 sm:mt-20 relative flex-center flex-col text-center text-white select-none gap-4 px-4`}>
                <Image src={booking_img} quality={60} alt="booking.webp" sizes="100vw" className="object-cover object-center select-none brightness-30" fill></Image>
                <p className="z-10 sm:text-5xl text-4xl tracking-wider font-primary">{t("heading")}</p>
                <p className="z-10 sm:text-2xl text-xl tracking-wide leading-8 italic font-secondary">{t("subtext")}</p>
                <Link aria-label={t("cta")} className="z-10 sm:text-3xl text-2xl underline italic font-primary" href={"/booking"}>
                    {t("cta")}
                </Link>
            </div>
        </FadeInObserver>
    );
}
