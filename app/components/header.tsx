"use client";
import { useEffect, useState, useReducer } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import Cross from "./svg/cross";
import MenuBurger from "./svg/menu_burger";
import Search from "./svg/search";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";
import Info from "./svg/info";

// 1. Explicitly type the State shape
type UIState = {
	isNavOpen: boolean;
	isCartOpen: boolean;
	isGlassy: boolean;
	lang: "EN" | "DE";
};

// 2. Strongly type the allowed Actions (fixes the ESLint 'any' issue)
type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

// 3. Apply the state type to your initial tracking object
const initialUIState: UIState = {
	isNavOpen: false,
	isCartOpen: false,
	isGlassy: false,
	lang: "EN",
};

// 4. Fully type the reducer inputs and return signature
function headerReducer(state: UIState, action: UIAction): UIState {
	switch (action.type) {
		case "OPEN_NAV":
			return { ...state, isNavOpen: true, isCartOpen: false };
		case "CLOSE_NAV":
			return { ...state, isNavOpen: false };
		case "OPEN_CART":
			return { ...state, isCartOpen: true, isNavOpen: false };
		case "CLOSE_CART":
			return { ...state, isCartOpen: false };
		case "TOGGLE_LANG":
			return { ...state, lang: state.lang === "EN" ? "DE" : "EN" };
		case "SET_GLASSY":
			return { ...state, isGlassy: action.payload }; // TypeScript now safely knows payload is a boolean
		default:
			return state;
	}
}

export default function Header() {
	// 3. Replace 4 individual useStates with 1 useReducer
	const [ui, dispatch] = useReducer(headerReducer, initialUIState);

	// Keep scroll tracking simple and performant
	const [, setScrollY] = useState<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setScrollY(currentScroll);

			// Handle liquid-glass transition trigger directly here without an extra loop
			if (currentScroll >= window.innerHeight) {
				dispatch({ type: "SET_GLASSY", payload: true });
			} else {
				dispatch({ type: "SET_GLASSY", payload: false });
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={`flex justify-between items-center w-dvw fixed top-0 left-0 z-50 p-8 transition-default ${ui.isGlassy ? "h-25 sm:h-30 text-primary" : "h-20 sm:h-25 text-white"}`}>
			<div className={`w-full h-full transition-default ease-in-out absolute inset-0 -z-10 liquid-glass ${ui.isGlassy ? "opacity-100" : "opacity-0"}`} />

			<div className={`w-1/3 flex justify-start items-center transition-default ${ui.isNavOpen ? "opacity-0" : "opacity-100"}`}>
				<button aria-label="menu" type="button" className="button2 float-anim" onClick={() => dispatch({ type: "OPEN_NAV" })}>
					<MenuBurger classnames="w-6 sm:w-8" clr="currentColor" />
				</button>
				<div className="flex-center sm:hidden gap-2">
					<label htmlFor="searchWatches">
						<Search classnames="w-7 sm:w-5" clr="currentColor" />
					</label>
					<input type="text" className={`hidden sm:block ${ui.isGlassy ? "placeholder:text-primary" : "placeholder:text-white"} outline-0`} placeholder="Search watches" id="searchWatches" />
				</div>
			</div>

			<div className="w-1/3 flex-center">
				<Link aria-label="home page" href={"#"}>
					<Logo classnames="w-20 sm:w-25" />
				</Link>
			</div>

			<div className="flex justify-end items-center gap-2 w-1/3">
				<div className="hidden sm:flex-center gap-2">
					<label htmlFor="searchWatches">
						<Search classnames="w-7 sm:w-5" clr="currentColor" />
					</label>
					<input type="text" className={`hidden sm:block ${ui.isGlassy ? "placeholder:text-primary" : "placeholder:text-white"} outline-0`} placeholder="Search watches" id="searchWatches" />
				</div>
				<button aria-label={`${ui.lang} language`} type="button" className={`button2 hidden sm:block ${ui.isGlassy ? "" : "hover:text-primary"}`} onClick={() => dispatch({ type: "TOGGLE_LANG" })}>
					{ui.lang}
				</button>
				<button aria-label="cart" type="button" onClick={() => dispatch({ type: "OPEN_CART" })} className={`button2 ${ui.isGlassy ? "" : "hover:text-primary"}`}>
					<Cart clr="currentColor" />
				</button>
				<ThemeToggle />
			</div>

			{/* Navigation Panel */}
			<nav className={`liquid-glass w-dvw md:w-[20dvw] transition-default h-dvh fixed top-0 left-0 flex flex-col justify-start items-start gap-16 p-16 ${ui.isNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
				<button aria-label="close navbar" type="button" className="absolute top-4 right-4 p-0 cursor-pointer" onClick={() => dispatch({ type: "CLOSE_NAV" })}>
					<Cross classnames={"w-16"} />
				</button>
			</nav>

			<div className={`liquid-glass w-dvw md:w-[30dvw] h-dvh fixed top-0 right-0 flex flex-col justify-start items-start gap-16 p-16 font-secondary transition-default ${ui.isCartOpen ? "translate-x-0":"translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between items-center w-full h-1/10">
					<h3 className="title3">YOUR COLLECTION</h3>
					<button aria-label="close cart" type="button" className="button2 p-1" onClick={() => dispatch({ type: "CLOSE_CART" })}>
						<Cross classnames={"w-16"} />
					</button>
				</div>

				<div className="flex-center flex-col gap-4 w-full h-4/5 font-sans text-secondary">
					<Info classnames={"w-18"} />
					<h5 className="title5 flex-center text-center">Your horological collection is empty.</h5>
				</div>

				<div className="flex flex-wrap justify-between items-center gap-4 w-full h-1/10">
					<div className="flex justify-between items-center w-full">
						<h5 className="title5">SUBTOTAL VALUE</h5>
						<h5 className="title5">{format(0)}</h5>
					</div>
					<button aria-label="proceed to secure settlement" type="button" className="button w-full flex-center title5">
						Proceed to secure settlement
					</button>
				</div>
			</div>
		</header>
	);
}

const intl = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});
function format(n: number): string {
	return intl.format(n);
}
