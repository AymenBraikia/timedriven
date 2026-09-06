"use client";
import { useTranslations } from "next-intl";
import Cross from "./svg/cross";
import { Activity, useEffect, useState } from "react";

export default function Note() {
    const t = useTranslations("note");

    const [disabled, set_disabled] = useState<boolean>((window.localStorage.getItem("disabled_note") ? true : false) || false);

    const [active, set_active] = useState<boolean>(false);

    function handle_scroll() {
        if (window.scrollY >= window.innerHeight * 2 && !active) set_active(true);
    }

    useEffect(() => {
        if (!active) window.addEventListener("scroll", handle_scroll);

        return () => {
            window.removeEventListener("scroll", handle_scroll);
        };
    }, []);

    return (
        <Activity mode={disabled ? "hidden" : "visible"}>
            <div className={`z-9000 flex flex-col gap-4 justify-start items-start fixed py-10 px-4  sm:px-4 sm:py-4 w-full h-fit top-full inset-s-0 -translate-y-full bg-background font-secondary ${active ? "fade-in" : "fade-out"}`}>
                <button
                    type="button"
                    className="button2 p-0 w-fit absolute top-2 sm:top-4 inset-e-4"
                    onClick={() => {
                        set_active(false);
                        setTimeout(() => {
                            set_disabled(true);
                            localStorage.setItem("disabled_note", "true");
                        }, 800);
                    }}
                >
                    <Cross classnames="sm:w-10 w-8" />
                </button>

                <p className="title-4 sm:title3 font-medium! underline capitalize">{t("title")}</p>
                <p className="text-sm leading-6 sm:text-base">{t("heading")}</p>

                <div className="flex gap-1 text-sm leading-6 sm:text-xl flex-col">
                    <p className="font-bold capitalize min-w-fit whitespace-nowrap">{t("problem.title")}:</p>
                    <p className="text-shine">{t("problem.text")}</p>
                </div>
                <div className="flex gap-1 text-sm leading-6 sm:text-xl flex-col">
                    <p className="font-bold capitalize min-w-fit whitespace-nowrap">{t("solution.title")}:</p>
                    <p className="text-shine">{t("solution.text")}</p>
                </div>
            </div>
        </Activity>
    );
}
