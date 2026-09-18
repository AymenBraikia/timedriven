"use client";

import updateUser from "@/app/server/update_user";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Payment_Options({ default_option }: { default_option: "card" | "paypal" | "bank" }) {
    const [option, set_option] = useState<"card" | "paypal" | "bank">(default_option);
    const t = useTranslations("checkout");
    return (
        <div className="w-full flex-center">
            <button
                type="button"
                onClick={async () => option != "bank" && (await updateUser({ payment_method: "bank" })) && set_option("bank")}
                className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${option == "bank" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
            >
                {t("bankTransfer")}
            </button>
            <button
                type="button"
                onClick={async () => option != "paypal" && (await updateUser({ payment_method: "paypal" })) && set_option("paypal")}
                className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${option == "paypal" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
            >
                PayPal
            </button>
            <button
                type="button"
                onClick={async () => option != "card" && (await updateUser({ payment_method: "card" })) && set_option("card")}
                className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${option == "card" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
            >
                {t("card")}
            </button>
        </div>
    );
}
