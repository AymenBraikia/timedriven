"use client";
import dynamic from "next/dynamic";

import { useEffect, useReducer, useRef } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import MenuBurger from "./svg/menu_burger";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";
import { useAuth } from "../(site)/context/authContext";
import Search_input from "./elements/search_input";
import { Watch } from "@/types/watch";
import Image from "next/image";
import increase_relevance_score from "@/app/server/increase_relevance_score";
import score_rewards from "../(site)/lib/relevance_score";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

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
            window.innerWidth < 640 && (document.body.style.overflowY = "clip");
            return { ...state, isNavOpen: true, isCartOpen: false };
        case "CLOSE_NAV":
            window.innerWidth < 640 && (document.body.style.overflowY = "auto");
            return { ...state, isNavOpen: false };
        case "OPEN_CART":
            window.innerWidth < 640 && (document.body.style.overflowY = "clip");
            return { ...state, isCartOpen: true, isNavOpen: false };
        case "CLOSE_CART":
            window.innerWidth < 640 && (document.body.style.overflowY = "auto");
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
    const locale = useLocale();
    const t = useTranslations("common");
    const pathname = usePathname();
    const router = useRouter();

    const [ui, dispatch] = useReducer(headerReducer, { ...initialUIState, lang: locale.toUpperCase() as "EN" | "DE" });
    const cartRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onTouchStart = (e: TouchEvent) => {
            const cartEl = cartRef.current;
            const navEl = navRef.current;
            if (!cartEl || !navEl) return;

            const startX = e.touches[0].clientX;
            const startY = e.touches[0].clientY;

            let gesture: "horizontal" | "vertical" | null = null;

            cartEl.style.transition = "50ms ease";
            navEl.style.transition = "50ms ease";

            const handleMove = (moveEvent: TouchEvent) => {
                const currentX = moveEvent.touches[0].clientX;
                const currentY = moveEvent.touches[0].clientY;

                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                // Wait until the user clearly starts moving
                if (gesture === null) {
                    if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) return;

                    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                        gesture = "horizontal";
                    } else {
                        gesture = "vertical";
                    }
                }

                // Let vertical scrolling happen normally
                if (gesture === "vertical") return;

                if (moveEvent.cancelable) {
                    moveEvent.preventDefault();
                }

                if (ui.isCartOpen) {
                    if (deltaX > 0) {
                        cartEl.style.transform = `translateX(${deltaX}px)`;
                    }
                } else {
                    if (ui.isNavOpen) {
                        if (deltaX < 0) {
                            navEl.style.transform = `translateX(${deltaX}px)`;
                        }
                    } else {
                        if (deltaX < 0) {
                            cartEl.style.transform = `translateX(${deltaX}px)`;
                        } else {
                            navEl.style.transform = `translateX(${deltaX}px)`;
                        }
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

                if (gesture !== "horizontal") return;

                const finalDeltaX = endEvent.changedTouches[0].clientX - startX;

                if (ui.isCartOpen) {
                    if (finalDeltaX > 80) {
                        dispatch({ type: "CLOSE_CART" });
                    }
                } else if (ui.isNavOpen) {
                    if (finalDeltaX < -80) {
                        dispatch({ type: "CLOSE_NAV" });
                    }
                } else {
                    if (finalDeltaX < -80) {
                        dispatch({ type: "OPEN_CART" });
                    } else if (finalDeltaX > 80) {
                        dispatch({ type: "OPEN_NAV" });
                    }
                }
            };

            window.addEventListener("touchmove", handleMove, { passive: false });
            window.addEventListener("touchend", handleEnd);
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
        };
    }, [ui.isCartOpen, ui.isNavOpen]);
    return (
        <header className={`flex justify-between items-center w-dvw fixed top-0 left-0 z-4000 sm:px-8 py-8 px-2 transition-default ${ui.isGlassy ? "h-25 sm:h-30 text-primary" : "h-20 sm:h-25 text-white backdrop-blur-md"}`}>
            <div className={`w-full h-full transition-default ease-in-out absolute inset-0 -z-10 liquid-glass ${ui.isGlassy ? "opacity-100" : "opacity-0"}`} />

            <div className={`w-1/3 flex justify-start items-center transition-default ${ui.isNavOpen ? "opacity-0" : "opacity-100"} gap-2`}>
                <button aria-label={"menu"} type="button" className="button2 p-2 md:p-auto" onClick={() => dispatch({ type: "OPEN_NAV" })}>
                    <MenuBurger classnames="w-6 sm:w-8" clr={"currentColor"} />
                </button>
                <div className="xl:hidden block">
                    <Search_input placeholder={t("filters.searchPlaceholder")} route="/api/search_watches" SearchChildComponent={SearchChildComponent} />
                </div>
            </div>

            <div className="w-1/3 flex-center">
                <Link aria-label={"home"} href={"/"}>
                    <Logo classnames="w-18 sm:w-25" />
                </Link>
            </div>

            <div className="flex justify-end items-center gap-2 w-1/3">
                <div className="xl:block hidden">
                    <Search_input placeholder={t("filters.searchPlaceholder")} route="/api/search_watches" SearchChildComponent={SearchChildComponent} />
                </div>

                {!session?.email && (
                    <Link aria-label={t("buttons.register")} className={`button2 hidden sm:block hover:text-primary`} href={"/auth/sign_up"}>
                        {t("buttons.register")}
                    </Link>
                )}
                <button aria-label={"change language"} type="button" className={`button2 hidden sm:block ${ui.isGlassy ? "" : "hover:text-primary"}`} onClick={() => {
                    const nextLocale = locale === "en" ? "de" : "en";
                    dispatch({ type: "TOGGLE_LANG" });
                    router.replace(pathname, { locale: nextLocale });
                }}>
                    {ui.lang}
                </button>
                <button aria-label={"cart"} type="button" onClick={() => dispatch({ type: "OPEN_CART" })} className={`button2 relative ${ui.isGlassy ? "" : "hover:text-primary"}`}>
                    <Cart clr={"currentColor"} />
                    {session && session.cart.length ? <p className="absolute left-1/2 top-1/2 text-[10px] flex-center p-1 bg-foreground text-background aspect-square rounded-full w-4 h-4">{session.cart.length}</p> : <></>}
                </button>
                <ThemeToggle />
            </div>

            <Nav ref={navRef} ui={ui} dispatch={dispatch} />
            <CartDrawer ref={cartRef} ui={ui} dispatch={dispatch} />
        </header>
    );
}

function SearchChildComponent({ item }: { item: Watch }) {
    return (
        <Link
            href={"/product/" + item.slug}
            onClick={async () => await increase_relevance_score(item.slug, score_rewards.search)}
            className="flex justify-between items-center w-full h-full text-sm capitalize gap-2 bg-transparent hover:bg-primary border-b sm:border-0 cursor-pointer transition-default p-2"
        >
            <div className="relative min-w-15 aspect-square">
                <Image src={item.images[0]} alt={item.brand + " " + item.model} fill sizes="(max-width: 768px) 150px, 100px" />
            </div>
            <p className="w-full">{item.brand + " " + item.model + " " + item.year + " Ref. " + item.reference}</p>
        </Link>
    );
}
