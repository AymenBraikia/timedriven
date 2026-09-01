"use client";
import dynamic from "next/dynamic";

import { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from "react";
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
import Credits from "./credits";
import Select from "./elements/select";
import { Locales } from "@/types/locales";

const CartDrawer = dynamic(() => import("./cart_drawer"), {
    ssr: false,
});
const Nav = dynamic(() => import("./nav"), {
    ssr: false,
});

const GESTURE_LOCK = 15;
const SWIPE_THRESHOLD = 80;

/**
 * Walks up from the touched node to decide whether the drawer swipe is allowed
 * to claim this gesture. Returns the horizontal scroller it landed in, if any.
 *
 * Opt out of the drawer swipe on any element with `data-no-swipe`.
 */
function swipe_guard(target: EventTarget | null): { blocked: boolean; scroller: HTMLElement | null } {
    let el = target instanceof Element ? (target as HTMLElement) : null;

    while (el && el !== document.body) {
        if (el.hasAttribute("data-no-swipe")) return { blocked: true, scroller: null };

        const style = getComputedStyle(el);

        // The element already told the browser it handles horizontal input itself
        // (e.g. the price slider's `touch-none`). Leave it alone.
        const touch = style.touchAction;
        if (touch.includes("none") || touch.includes("pan-y")) return { blocked: true, scroller: null };

        const overflow_x = style.overflowX;
        if ((overflow_x === "auto" || overflow_x === "scroll") && el.scrollWidth - el.clientWidth > 1) {
            return { blocked: false, scroller: el };
        }

        el = el.parentElement;
    }

    return { blocked: false, scroller: null };
}

/** Can this scroller still move in the direction the finger is going? */
function can_scroll(el: HTMLElement, deltaX: number): boolean {
    const max = el.scrollWidth - el.clientWidth;

    // Finger moves right -> content scrolls back toward the start.
    if (deltaX > 0) return el.scrollLeft > 1;

    return el.scrollLeft < max - 1;
}

type UIState = {
    isNavOpen: boolean;
    isCartOpen: boolean;
    isGlassy: boolean;
};

type UIAction = { type: "OPEN_NAV" } | { type: "CLOSE_NAV" } | { type: "OPEN_CART" } | { type: "CLOSE_CART" } | { type: "TOGGLE_LANG" } | { type: "SET_GLASSY"; payload: boolean };

const initialUIState: UIState = {
    isNavOpen: false,
    isCartOpen: false,
    isGlassy: true,
};

const locales_map = new Map<string, Locales>([
    ["English", "en"],
    ["Deutsch", "de"],
    ["Arabic", "ar"],
    ["French", "fr"],
    ["Italian", "it"],
    ["Turkish", "tr"],

    ["en", "en"],
    ["de", "de"],
    ["ar", "ar"],
    ["fr", "fr"],
    ["it", "it"],
    ["tr", "tr"],
]);

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
        case "SET_GLASSY":
            if (state.isGlassy === action.payload) return state;
            return { ...state, isGlassy: action.payload };
        default:
            return state;
    }
}

export default function Header() {
    const { session } = useAuth();
    const locale = useLocale() as Locales;
    const t = useTranslations("common");

    const [lang, set_lang] = useState<Locales>(locale);

    const selected_locale = locales_map.get(lang)!.toUpperCase();

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        router.replace(pathname, { locale: selected_locale });
    }, [lang]);

    const [ui, dispatch] = useReducer(headerReducer, initialUIState);
    const cartRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Lets us tear down a half-finished gesture if the component unmounts.
        let release: (() => void) | null = null;

        const onTouchStart = (e: TouchEvent) => {
            // Pinch-zoom and other multi-touch are never drawer gestures.
            if (e.touches.length > 1) return;

            const cartEl = cartRef.current;
            const navEl = navRef.current;
            if (!cartEl || !navEl) return;

            const { blocked, scroller } = swipe_guard(e.target);
            if (blocked) return;

            const startX = e.touches[0].clientX;
            const startY = e.touches[0].clientY;

            let gesture: "horizontal" | "vertical" | "native" | null = null;

            cartEl.style.transition = "50ms ease";
            navEl.style.transition = "50ms ease";

            const handleMove = (moveEvent: TouchEvent) => {
                if (moveEvent.touches.length > 1) {
                    gesture = "native";
                    return;
                }

                const currentX = moveEvent.touches[0].clientX;
                const currentY = moveEvent.touches[0].clientY;

                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                // Wait until the user clearly starts moving
                if (gesture === null) {
                    if (Math.abs(deltaX) < GESTURE_LOCK && Math.abs(deltaY) < GESTURE_LOCK) return;

                    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                        // The scroller under the finger gets first refusal. Only once it
                        // has run out of room does the drawer take the gesture.
                        if (scroller && can_scroll(scroller, deltaX)) {
                            gesture = "native";
                            return;
                        }

                        gesture = "horizontal";
                    } else {
                        gesture = "vertical";
                    }
                }

                // Let vertical scrolling and native horizontal scrolling happen normally
                if (gesture !== "horizontal") return;

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

            const reset = () => {
                window.removeEventListener("touchmove", handleMove);
                window.removeEventListener("touchend", handleEnd);
                window.removeEventListener("touchcancel", handleCancel);
                release = null;

                cartEl.style.transition = "";
                cartEl.style.transform = "";

                navEl.style.transition = "";
                navEl.style.transform = "";
            };

            const handleCancel = () => reset();

            const handleEnd = (endEvent: TouchEvent) => {
                const settled = gesture;
                reset();

                if (settled !== "horizontal") return;

                const finalDeltaX = endEvent.changedTouches[0].clientX - startX;

                if (ui.isCartOpen) {
                    if (finalDeltaX > SWIPE_THRESHOLD) dispatch({ type: "CLOSE_CART" });
                } else if (ui.isNavOpen) {
                    if (finalDeltaX < -SWIPE_THRESHOLD) dispatch({ type: "CLOSE_NAV" });
                } else {
                    if (finalDeltaX < -SWIPE_THRESHOLD) dispatch({ type: "OPEN_CART" });
                    else if (finalDeltaX > SWIPE_THRESHOLD) dispatch({ type: "OPEN_NAV" });
                }
            };

            release = reset;

            window.addEventListener("touchmove", handleMove, { passive: false });
            window.addEventListener("touchend", handleEnd);
            window.addEventListener("touchcancel", handleCancel);
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            release?.();
        };
    }, [ui.isCartOpen, ui.isNavOpen]);

    return (
        <>
            <header className={`flex flex-col w-dvw fixed top-0 left-0 z-4000 h-fit min-h-25 sm:min-h-20 text-primary bg-background`}>
                <Credits />
                <div className="w-full flex justify-between items-center sm:px-8 py-8 sm:py-2 px-2">
                    <div className={`w-1/3 flex justify-start items-center transition-default ${ui.isNavOpen ? "opacity-0" : "opacity-100"} gap-2`}>
                        <button aria-label={"menu"} type="button" className="button2 p-2 md:p-auto" onClick={() => dispatch({ type: "OPEN_NAV" })}>
                            <MenuBurger classnames="w-6 sm:w-8" clr={"currentColor"} />
                        </button>
                        <div className="xl:hidden block">
                            <Search_input placeholder={t("filters.searchPlaceholder")} route="/api/search_watches" SearchChildComponent={SearchChildComponent} />
                        </div>
                    </div>

                    <div className="w-1/3 flex-center">
                        <Link aria-label={"home"} href={"/"} className="relative aspect-video w-25">
                            <Image src={"/logo_dark.png"} sizes="(max-width: 768px) 175px, 200px" alt="Arvell" fill className={`object-cover object-center dark:brightness-100 brightness-0 `} />
                        </Link>
                    </div>

                    <div className="flex justify-end items-center gap-2 w-1/3">
                        <div className="xl:block hidden">
                            <Search_input placeholder={t("filters.searchPlaceholder")} route="/api/search_watches" SearchChildComponent={SearchChildComponent} />
                        </div>

                        {!session?.email && (
                            <Link aria-label={t("buttons.register")} className={`button2 hidden sm:block hover:text-primary capitalize`} href={"/auth/sign_up"}>
                                {t("buttons.register")}
                            </Link>
                        )}
                        <Select options={["English", "Deutsch", "Arabic", "French", "Italian", "Turkish"]} value={selected_locale} set_value={set_lang as Dispatch<SetStateAction<string>>} />

                        {/* <button
                            aria-label={"change language"}
                            type="button"
                            className={`button2 hidden sm:block ${ui.isGlassy ? "" : "hover:text-primary"}`}
                            onClick={() => {
                                const nextLocale = locale == "en" ? "de" : "en";
                                dispatch({ type: "TOGGLE_LANG" });
                                router.replace(pathname, { locale: nextLocale });
                            }}
                        >
                            {ui.lang}
                        </button> */}

                        <button aria-label={"cart"} type="button" onClick={() => dispatch({ type: "OPEN_CART" })} className={`button2 relative ${ui.isGlassy ? "" : "hover:text-primary"}`}>
                            <Cart clr={"currentColor"} />
                            {session && session.cart.length ? <p className="absolute left-1/2 top-1/2 text-[10px] flex-center p-1 bg-foreground text-background aspect-square rounded-full w-4 h-4">{session.cart.length}</p> : <></>}
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
                <Nav ref={navRef} ui={ui} dispatch={dispatch} />
                <CartDrawer ref={cartRef} ui={ui} dispatch={dispatch} />
            </header>
        </>
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
