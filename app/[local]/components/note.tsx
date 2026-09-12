"use client";

import { useTranslations } from "next-intl";
import Cross from "./svg/cross";
import { Activity, useEffect, useState } from "react";
import Link from "next/link";
import { update_visit } from "@/app/server/update_visit";
import { closed_popup } from "@/app/server/popup";

export default function Note({ one_time = false }: { one_time?: boolean }) {
    const t = useTranslations("note");

    const [disabled, set_disabled] = useState(false);
    const [active, set_active] = useState(false);

    useEffect(() => {
        const alreadyDisabled = window.localStorage.getItem("disabled_note");

        if (alreadyDisabled) set_disabled(true);
    }, []);

    function activate() {
        if (active) return;
        update_visit();
        set_active(true);
    }

    useEffect(() => {
        if (one_time && disabled) return;

        const timer = setTimeout(activate, 1e4);

        return () => {
            clearTimeout(timer);
        };
    }, [disabled, active]);

    function close_note() {
        set_active(false);
        closed_popup();

        setTimeout(() => {
            set_disabled(true);
            window.localStorage.setItem("disabled_note", "true");
        }, 800);
    }

    return (
        <Activity mode={one_time && disabled ? "hidden" : "visible"}>
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

                    <Link href="/en/why" className="w-fit button font-light sm:font-normal text-sm sm:text-base font-secondary tracking-wide">
                        {t("link")}
                    </Link>
                </div>
            </div>
        </Activity>
    );
}
