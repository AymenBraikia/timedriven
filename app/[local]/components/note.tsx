"use client";

import { useTranslations } from "next-intl";
import Cross from "./svg/cross";
import { Activity, useEffect, useState } from "react";
import Link from "next/link";

export default function Note() {
    const t = useTranslations("note");

    const [disabled, set_disabled] = useState(false);
    const [active, set_active] = useState(false);

    useEffect(() => {
        const alreadyDisabled = window.localStorage.getItem("disabled_note");

        if (alreadyDisabled) {
            set_disabled(true);
        }
    }, []);

    function handle_scroll() {
        if (window.scrollY >= window.innerHeight * 2 && !active) {
            set_active(true);
        }
    }

    useEffect(() => {
        if (disabled) return;

        window.addEventListener("scroll", handle_scroll);

        return () => {
            window.removeEventListener("scroll", handle_scroll);
        };
    }, [disabled, active]);

    function close_note() {
        set_active(false);

        setTimeout(() => {
            set_disabled(true);
            window.localStorage.setItem("disabled_note", "true");
        }, 800);
    }

    return (
        <Activity mode={disabled ? "hidden" : "visible"}>
            <div
                className={`z-9000 fixed top-full inset-s-0 w-full -translate-y-full
                bg-background border-t border-foreground/10
                px-5 py-6 sm:px-8 sm:py-5
                font-secondary
                ${active ? "fade-in" : "hidden"}`}
            >
                <button type="button" aria-label="Close" className="button2 p-0 w-fit absolute top-3 sm:top-4 inset-e-4" onClick={close_note}>
                    <Cross classnames="sm:w-8 w-7" />
                </button>

                <div className="max-w-5xl flex flex-col gap-4 pe-8">
                    <div>
                        <p className="title4 sm:title3 font-light! tracking-wide">{t("title")}</p>

                        <p className="font-sans text-xs sm:text-base tracking-wide leading-6 sm:leading-8 text-secondary max-w-3xl mt-2">{t("heading")}</p>
                    </div>

                    <Link href="/en/why" className="font-sans w-fit button font-light sm:font-normal text-sm sm:text-base">
                        {t("link")}
                    </Link>
                </div>
            </div>
        </Activity>
    );
}
