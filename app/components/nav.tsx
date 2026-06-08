import Link from "next/link";
import { ActionDispatch } from "react";
import Cross from "./svg/cross";

type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

export default function Nav({ dispatch, ui }: { dispatch: ActionDispatch<[action: UIAction]>; ui: { isNavOpen: boolean } }) {
	return (
		<nav className={`liquid-glass w-dvw lg:w-[20dvw] transition-default h-dvh fixed top-0 left-0 flex flex-col justify-start items-start gap-16 p-16 ${ui.isNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
			<div className="flex flex-col h-4/5">
				<div className="flex flex-col gap-4">
					<h5 className="title3">Shop</h5>
					<ul>
						<li className="my-1">
							<Link aria-label="watches list" href={"#"}>
								Watches
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="spare parts" href={"#"}>
								Spare Parts
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="favorites" href={"#"}>
								Favorites
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="about us" href={"#"}>
								About Us
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h5 className="title3">Service</h5>
					<ul>
						<li className="my-1">
							<Link aria-label="Store" href={"#"}>
								Store
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="Sell / Consign" href={"#"}>
								Sell / Consign
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="Polishing and Service" href={"#"}>
								Polishing and Service
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="Shipping & Payments" href={"#"}>
								Shipping & Payments
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="Frequently Asked Questions" href={"#"}>
								Frequently Asked Questions (FAQ)
							</Link>
						</li>
						<li className="my-1">
							<Link aria-label="Vacancies" href={"#"}>
								Vacancies
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="h-1/4 w-full flex flex-col gap-4">
				<h5 className="title5 tracking-wider">Book an Appointment</h5>
				<p className="leading-8 tracking-wide">As experts, we give you our professional opinion on any matter you may have.</p>
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
