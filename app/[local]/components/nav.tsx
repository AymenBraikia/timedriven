import Link from "next/link";
import { ActionDispatch, RefObject } from "react";
import Cross from "./svg/cross";

type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

export default function Nav({ dispatch, ui, ref }: { ref: RefObject<HTMLElement | null>; dispatch: ActionDispatch<[action: UIAction]>; ui: { isNavOpen: boolean } }) {
    return (
        <nav
            ref={ref}
            className={`liquid-glass w-dvw lg:w-[20dvw] transition-default max-h-dvh h-dvh fixed top-0 left-0 flex flex-col justify-between items-start gap-5 p-5 md:gap-8 md:px-16 md:py-8 ${ui.isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex flex-col h-7/10 md:h-6/10 gap-6">
                <div className="flex flex-col gap-2 md:gap-3">
                    <h5 className="title3">Shop</h5>
                    <ul className="gap-2!">
                        <li>
                            <Link className="text-sm" aria-label="watches list" href={"#"}>
                                Watches
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="spare parts" href={"#"}>
                                Spare Parts
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="favorites" href={"#"}>
                                Favorites
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="about us" href={"#"}>
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                    <h5 className="title3">Service</h5>
                    <ul className="gap-2!">
                        <li>
                            <Link className="text-sm" aria-label="Store" href={"#"}>
                                Store
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="Sell / Consign" href={"#"}>
                                Sell / Consign
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="Polishing and Service" href={"#"}>
                                Polishing and Service
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="Shipping & Payments" href={"#"}>
                                Shipping & Payments
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="Frequently Asked Questions" href={"#"}>
                                Frequently Asked Questions (FAQ)
                            </Link>
                        </li>
                        <li>
                            <Link className="text-sm" aria-label="Vacancies" href={"#"}>
                                Vacancies
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="md:h-3/10 h-3/10  w-full flex flex-col gap-4">
                <h5 className="title5 mr-[0.05rem] tracking-wider">Book an Appointment</h5>
                <p className="leading-6 mr-[0.025rem] tracking-wide text-sm">As experts, we give you our professional opinion on any matter you may have.</p>
                <Link aria-label="Book now" className="title6 underline" href={"#"}>
                    Book now
                </Link>
            </div>
            <button aria-label="close navbar" type="button" className="absolute top-4 right-4 p-0 cursor-pointer" onClick={() => dispatch({ type: "CLOSE_NAV" })}>
                <Cross classnames={"w-16"} />
            </button>
        </nav>
    );
}
