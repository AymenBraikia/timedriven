"use client";
import Link from "next/link";
import { ActionDispatch, RefObject } from "react";
import Cross from "./svg/cross";
import { useTranslations } from "next-intl";

type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

export default function Nav({ dispatch, ui, ref }: { ref: RefObject<HTMLElement | null>; dispatch: ActionDispatch<[action: UIAction]>; ui: { isNavOpen: boolean } }) {
    const nav = useTranslations("common.nav");
    const footer = useTranslations("common.footer");
    const booking = useTranslations("home.bookingBanner");
    return (
        <nav
            ref={ref}
            className={`liquid-glass w-dvw sm:min-w-100 lg:w-[20dvw] transition-default max-h-dvh h-dvh fixed top-0 left-0 flex flex-col justify-between items-start gap-5 p-5 md:gap-8 md:px-16 md:py-8 ${ui.isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex flex-col h-7/10 md:h-6/10 gap-6">
                <div className="flex flex-col gap-5 md:gap-6">
                    <h5 className="title3">{footer("shopHeading")}</h5>
                    <ul className="gap-4!">
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="watches list" href="/shop">
                                {nav("watches")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="spare parts" href="/spare">
                                {nav("spareParts")}
                            </Link>
                        </li>

                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="about us" href="/info/about">
                                {nav("aboutUs")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5 md:gap-6">
                    <h5 className="title3">{footer("serviceHeading")}</h5>
                    <ul className="gap-4!">
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Store" href="/store">
                                {nav("store")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Sell / Consign" href="/sell">
                                {nav("sellConsign")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Polishing and Service" href="/polish">
                                {nav("polishingServices")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Shipping & Payments" href="/info/payments">
                                {nav("shippingPayments")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Frequently Asked Questions" href="/info/faq">
                                {nav("faq")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => dispatch({ type: "CLOSE_NAV" })} className="text-base" aria-label="Vacancies" href="/info/vacancies">
                                {nav("vacancies")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="md:h-3/10 h-3/10  w-full flex flex-col gap-4">
                <h5 className="title5 tracking-wider">{booking("heading")}</h5>
                <p className="leading-6 tracking-wide text-sm">{booking("subtext")}</p>
                <Link aria-label={booking("cta")} className="title6 underline" href={"/booking"}>
                    {booking("cta")}
                </Link>
            </div>
            <button aria-label={"close"} type="button" className="absolute top-4 right-4 p-0 cursor-pointer" onClick={() => dispatch({ type: "CLOSE_NAV" })}>
                <Cross classnames={"w-16"} />
            </button>
        </nav>
    );
}
