"use client";
import dynamic from "next/dynamic";

import { useEffect, useReducer } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import MenuBurger from "./svg/menu_burger";
import Search from "./svg/search";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";

const CartDrawer = dynamic(() => import("./cart_drawer"), {
	ssr: false,
});
const Nav = dynamic(() => import("./nav"), {
	ssr: false,
});

type UIState = {
	isNavOpen: boolean;
	isCartOpen: boolean;
	isGlassy: boolean;
	lang: "EN" | "DE";
};

type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

const initialUIState: UIState = {
	isNavOpen: false,
	isCartOpen: false,
	isGlassy: false,
	lang: "EN",
};

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
			if (state.isGlassy === action.payload) return state;
			return { ...state, isGlassy: action.payload };
		default:
			return state;
	}
}

export default function Header() {
	const [ui, dispatch] = useReducer(headerReducer, initialUIState);

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;

			// Handle liquid-glass transition trigger directly here without an extra loop
			if (currentScroll >= window.innerHeight) {
				if (!ui.isGlassy) dispatch({ type: "SET_GLASSY", payload: true });
			} else if (ui.isGlassy) dispatch({ type: "SET_GLASSY", payload: false });
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [ui.isGlassy]);

	return (
		<header className={`flex justify-between items-center w-dvw fixed top-0 left-0 z-50 p-8 transition-default ${ui.isGlassy ? "h-25 sm:h-30 text-primary" : "h-20 sm:h-25 text-white"}`}>
			<div className={`w-full h-full transition-default ease-in-out absolute inset-0 -z-10 liquid-glass ${ui.isGlassy ? "opacity-100" : "opacity-0"}`} />

			<div className={`w-1/3 flex justify-start items-center transition-default ${ui.isNavOpen ? "opacity-0" : "opacity-100"}`}>
				<button aria-label="menu" type="button" className="button2 float-anim" onClick={() => dispatch({ type: "OPEN_NAV" })}>
					<MenuBurger classnames="w-6 sm:w-8" clr={"currentColor"} />
				</button>
				<div className="flex-center lg:hidden! gap-2">
					<label htmlFor="searchWatches">
						<Search classnames="w-7 sm:w-5" clr={"currentColor"} />
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
				<div className="hidden lg:flex-center gap-2">
					<label htmlFor="searchWatches">
						<Search classnames="w-7 sm:w-5" clr={"currentColor"} />
					</label>
					<input type="text" className={`hidden sm:block ${ui.isGlassy ? "placeholder:text-primary" : "placeholder:text-white"} outline-0`} placeholder="Search watches" id="searchWatches" />
				</div>
				<button aria-label={`${ui.lang} language`} type="button" className={`button2 hidden sm:block ${ui.isGlassy ? "" : "hover:text-primary"}`} onClick={() => dispatch({ type: "TOGGLE_LANG" })}>
					{ui.lang}
				</button>
				<button aria-label="cart" type="button" onClick={() => dispatch({ type: "OPEN_CART" })} className={`button2 ${ui.isGlassy ? "" : "hover:text-primary"}`}>
					<Cart clr={"currentColor"} />
				</button>
				<ThemeToggle />
			</div>

			<Nav ui={ui} dispatch={dispatch} />
			<CartDrawer ui={ui} dispatch={dispatch} />
		</header>
	);
}
