"use client";
import dynamic from "next/dynamic";

import { useEffect, useReducer, useRef } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import MenuBurger from "./svg/menu_burger";
import Search from "./svg/search";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";
import { useAuth } from "../(site)/context/authContext";

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
    isGlassy: true,
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
    const { session } = useAuth();

    const [ui, dispatch] = useReducer(headerReducer, initialUIState);
    const cartRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onTouchStart = (e: TouchEvent) => {
            const cartEl = cartRef.current;
            const navEl = navRef.current;
            if (!cartEl || !navEl) return;

            const startX = e.touches[0].clientX;
            const startY = e.touches[0].clientY;

            cartEl.style.transition = "50ms ease";
            navEl.style.transition = "50ms ease";

            const handleMove = (moveEvent: TouchEvent) => {
                const currentX = moveEvent.touches[0].clientX;
                const currentY = moveEvent.touches[0].clientY;

                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (moveEvent.cancelable) {
                        moveEvent.preventDefault();
                    }
                }

                if (ui.isCartOpen) {
                    if (deltaX > 0) cartEl.style.transform = `translateX(${Math.abs(deltaX)}px)`;
                } else {
                    if (ui.isNavOpen) {
                        if (deltaX < 0) navEl.style.transform = `translateX(-${Math.abs(deltaX)}px)`;
                    } else {
                        if (deltaX < 0) cartEl.style.transform = `translateX(-${Math.abs(deltaX)}px)`;
                        else navEl.style.transform = `translateX(${Math.abs(deltaX)}px)`;
                    }
                }
            };

            const handleEnd = (endEvent: TouchEvent) => {
                window.removeEventListener("touchmove", handleMove);
                window.removeEventListener("touchend", handleEnd);

                cartEl.style.transition = "";
                cartEl.style.transform = "";

                navEl.style.transition = "";
                navEl.style.transform = "";

                const finalDeltaX = endEvent.changedTouches[0].clientX - startX;

                if (ui.isCartOpen) {
                    if (finalDeltaX > 80) dispatch({ type: "CLOSE_CART" });
                } else {
                    if (ui.isNavOpen) {
                        if (finalDeltaX < -80) dispatch({ type: "CLOSE_NAV" });
                    } else {
                        if (finalDeltaX < -80) dispatch({ type: "OPEN_CART" });
                        else if (finalDeltaX > 80) dispatch({ type: "OPEN_NAV" });
                    }
                }
            };

            window.addEventListener("touchmove", handleMove, { passive: false });
            window.addEventListener("touchend", handleEnd);
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });

        return () => window.removeEventListener("touchstart", onTouchStart);
    }, [ui.isCartOpen, ui.isGlassy, ui.isNavOpen]);
    return (
        <header className={`flex justify-between items-center w-dvw fixed top-0 left-0 z-40 p-8 transition-default ${ui.isGlassy ? "h-25 sm:h-30 text-primary" : "h-20 sm:h-25 text-white backdrop-blur-md"}`}>
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
                <Link aria-label="home page" href={"/"}>
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
                {!session?.name && (
                    <button aria-label={`Register`} type="button" className={`button2 hidden sm:block hover:text-primary`} onClick={() => dispatch({ type: "TOGGLE_LANG" })}>
                        <Link href={"/auth/sign_up"}>Register</Link>
                    </button>
                )}
                <button aria-label={`${ui.lang} language`} type="button" className={`button2 hidden sm:block ${ui.isGlassy ? "" : "hover:text-primary"}`} onClick={() => dispatch({ type: "TOGGLE_LANG" })}>
                    {ui.lang}
                </button>
                <button aria-label="cart" type="button" onClick={() => dispatch({ type: "OPEN_CART" })} className={`button2 ${ui.isGlassy ? "" : "hover:text-primary"}`}>
                    <Cart clr={"currentColor"} />
                </button>
                <ThemeToggle />
            </div>

            <Nav ref={navRef} ui={ui} dispatch={dispatch} />
            <CartDrawer ref={cartRef} ui={ui} dispatch={dispatch} />
        </header>
    );
}
