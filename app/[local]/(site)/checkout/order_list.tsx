"use client";

import Image from "next/image";
import { useAuth } from "../context/authContext";
import { ChangeEvent, useEffect, useState } from "react";
import shipping_info from "@/app/shipping.json";
import CheckBox from "@/app/components/elements/checkbox";
import updateUser from "@/app/server/update_user";
import Input from "@/app/components/elements/input";
import PayPal_Btn from "@/app/components/buttons/paypal";
import { format_price } from "../lib/price_format";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const shipping_data = Object.values(shipping_info);

interface shipping_type {
    country_name: string;
    region: string;
    currency: string;
    shipping_cost: number;
    estimated_delivery: string;
    carrier: string;
    insurance_included: boolean;
    requires_signature: boolean;
    special_notes: string;
}

const payments = {
    paypal: { name: "PayPal", fee: 0.03 },
    cards: { name: "Credit/Debit Card", fee: 0.014 },
    bank_transfer: { name: "Bank Transfer", fee: 0 },
};

export default function Order_list() {
    const { session } = useAuth();
    if (!session) return <></>;

    const t = useTranslations("checkout");
    const t_cart = useTranslations("cart");

    const [total, set_total] = useState<number>(session.cart.reduce((prev, current) => prev + current.price * current.quantity, 0) || 0);

    const [shipping] = useState<shipping_type>(shipping_data.find((e) => e.country_name == session.address.country)!);

    const [local_pickup, set_local_pickup] = useState<boolean>(session.local_pickup);

    const [payment_method, set_payment_method] = useState<{ name: string; fee: number }>(payments.bank_transfer);

    const [read, set_read] = useState<boolean>(false);

    useEffect(() => {
        set_total(session.cart.reduce((prev, current) => prev + current.price * current.quantity, 0) || 0);
    }, [session]);

    useEffect(() => {
        updateUser({ local_pickup });
    }, [local_pickup]);

    const [card_number, set_card_numbers] = useState<string>("");
    const [expire, set_expire] = useState<string>("");
    const [sec_code, set_sec_code] = useState<string>("");

    function validate_cc(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const rawValue = e.target.value.replace(/\D/g, "");

        const trimmedValue = rawValue.slice(0, 16);

        const formattedValue = trimmedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

        set_card_numbers(formattedValue);
    }
    function validate_exp(e: ChangeEvent<HTMLInputElement>) {
        const rawValue = e.target.value.replace(/\D/g, "");
        const trimmedValue = rawValue.slice(0, 4);
        const formattedValue = trimmedValue.replace(/(\d{2})(?=\d)/, "$1/");
        set_expire(formattedValue);
    }

    function validate_sec(e: ChangeEvent<HTMLInputElement>) {
        const rawValue = e.target.value.replace(/\D/g, "");
        const formattedValue = rawValue.slice(0, 4);
        set_sec_code(formattedValue);
    }

    function check_address(): boolean {
        if (!session) return false;
        const { address1, postCode, city, country, phone } = session.address;

        const is_address_provided =
            (session.diff_address.active && session.diff_address.address1 && session.diff_address.postCode && session.diff_address.city && session.diff_address.country && session.diff_address.phone) ||
            (!session.diff_address.active && address1 && postCode && city && country && phone)
                ? true
                : false;

        return session.local_pickup || is_address_provided;
    }

    const [allowed_payment, set_allowed_payment] = useState<boolean>(check_address());

    useEffect(() => {
        set_allowed_payment(check_address());
    }, [session]);

    return (
        <div className="flex justify-start items-start flex-col gap-4 w-full h-fit font-secondary">
            <div className="flex flex-col justify-start items-start w-full max-h-[50dvh] border-b">
                <div className="sm:flex hidden justify-between items-center font-medium w-full text-xl gap-4 p-2 capitalize border-b">
                    <p className="min-w-30 w-full">{t("watchSpare")}</p>
                </div>
                <div className="w-full max-h-full overflow-y-auto overflow-x-hidden gap-2 flex flex-col justify-start items-start py-2">
                    {session.cart.map((i, c) => (
                        <div key={i.slug} className={`flex justify-between items-center gap-4 h-25 shrink-0 sm:h-fit w-full pr-4 pb-2 ${session.cart.length - 1 != c ? "border-b" : ""}`}>
                            <div className="relative aspect-square sm:h-25 h-full">
                                <Image src={i.images[0]} alt={i.slug} fill sizes="25vw" />
                            </div>

                            <div className="flex justify-between items-center flex-wrap gap-4 h-full w-full">
                                <div className="w-full flex justify-start-items-start gap-2 tracking-wider capitalize">
                                    <h6 className="text-shine">{i.brand + " " + i.model}</h6>
                                </div>
                                <p className="text-base font-medium min-w-20 max-w-30 block font-sans">Quantity: {i.quantity}</p>
                                <p className="text-base sm:text-base font-medium w-fit sm:w-25 font-sans">{format_price(i.price * i.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-between items-center mt-2 border-b">
                <h5>{t("subtotal")}</h5>
                <h5>{format_price(total)}</h5>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4 border-b tracking-wider">
                <CheckBox label={t_cart("localPickup")} action={set_local_pickup} active={local_pickup} />
                <div className={`w-full flex justify-between items-center ${local_pickup ? "line-through brightness-75" : ""}`}>
                    <p>{t_cart("shipping_to", { country: session.address.country })}</p>
                    <p>{format_price(shipping.shipping_cost)}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p>{t("taxes")}</p>
                    <p>{format_price(0)}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p>
                        {payment_method.name} {t("fee")}
                    </p>
                    <p>{format_price(payment_method.fee * total)}</p>
                </div>

                <div className="w-full flex justify-between items-center">
                    <h5>{t_cart("total")}</h5>
                    <h5>{format_price(total + total * payment_method.fee + (local_pickup ? 0 : shipping.shipping_cost))}</h5>
                </div>
            </div>

            <div className="w-full border-b">
                <h2>{t("payment")}</h2>
            </div>

            <div className="flex-center flex-col w-full gap-8 font-sans">
                <div className="flex-center h-15 lg:h-fit w-full sm:text-base text-sm">
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.bank_transfer)}
                        className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${payment_method.name == "Bank Transfer" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        {t("bankTransfer")}
                    </button>
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.paypal)}
                        className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${payment_method.name == "PayPal" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        PayPal
                    </button>
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.cards)}
                        className={`w-full h-full button2 sm:px-2 sm:py-4 p-2 transition-default border-b ${payment_method.name == "Credit/Debit Card" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        {t("card")}
                    </button>
                </div>
                {allowed_payment ? (
                    <div className={`flex justify-start items-center transition-default w-full ${payment_method.name == "PayPal" ? "" : "bg-secondary p-4 sm:p-0 sm:py-8 sm:px-12"} capitalize gap-2 flex-wrap`}>
                        {payment_method.name == "Bank Transfer" ? (
                            <div className="flex flex-col justify-start items-start gap-4">
                                <p className="tracking-wider leading-6 text-sm">{t("bankNote")}</p>

                                {read ? (
                                    <div className="w-full flex justify-center items-start flex-col gap-4 capitalize">
                                        <div className="w-full flex justify-between items-center">
                                            <p>{t("orderNumber")}:</p>
                                            <p>92212</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>{t("orderDate")}:</p>
                                            <p>{new Date().toDateString()}</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>{t("orderTotal")}:</p>
                                            <p>{format_price(total + total * payment_method.fee + (local_pickup ? 0 : shipping.shipping_cost))}</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>{t("paymentMethod")}:</p>
                                            <p>{payment_method.name}</p>
                                        </div>
                                        <span className="w-full h-px bg-foreground"></span>
                                        <div className="w-full flex justify-between items-center">
                                            <p>Bank:</p>
                                            <p className="font-semibold">Hamburger Sparkasse AG</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>IBAN:</p>
                                            <p className="font-semibold">DE54 2005 0550 1502 4094 59</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>BIC:</p>
                                            <p className="font-semibold">HASPDEHHXXX</p>
                                        </div>
                                    </div>
                                ) : (
                                    <button className={`button ${allowed_payment ? "" : "cursor-not-allowed brightness-75"} `} type="button" onClick={() => allowed_payment && set_read(true)}>
                                        {t("continue")}
                                    </button>
                                )}
                            </div>
                        ) : payment_method.name == "PayPal" ? (
                            <div className="w-full">
                                <PayPal_Btn disabled={false} />
                                <p className="w-full">
                                    {t("paypalNote")} <br /> <br /> <span className="text-shine">{t("email")}: </span> <span className="font-semibold">test@arvell.com</span>
                                    <br /> <span className="text-shine">{t("password")}: </span> <span className="font-semibold">Arvell_123</span>
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="sm:text-xl text-sm tracking-wider w-full">
                                    <Input label={t("cardNumber")} type="text" max={19} placeholder="1234 1234 1234 1234" onChange={validate_cc} value={card_number} />
                                </div>

                                <div className="sm:text-xl text-sm tracking-wider w-[calc(50%-4px)]">
                                    <Input label={t("expirationDate")} type="text" max={19} placeholder="MM/YY" onChange={validate_exp} value={expire} />
                                </div>

                                <div className="sm:text-xl text-sm tracking-wider w-[calc(50%-4px)]">
                                    <Input label={t("securityCode")} type="text" max={3} placeholder="123" onChange={validate_sec} value={sec_code} />
                                </div>
                                <button type="button" className="button w-full mt-4 sm:text-base text-sm">
                                    {t("placeOrder")}
                                </button>
                            </>
                        )}
                    </div>
                ) : payment_method.name == "PayPal" ? (
                    <div className="w-full">
                        <PayPal_Btn disabled={false} />
                        <p className="w-full">
                            {t("paypalNote")} <br /> <br /> <span className="text-shine">{t("email")}: </span> <span className="font-semibold lowercase">test@arvell.com</span>
                            <br /> <span className="text-shine">{t("password")}: </span> <span className="font-semibold">Arvell_123</span>
                        </p>
                    </div>
                ) : (
                    <h3>{t("missingBilling")}</h3>
                )}
            </div>
        </div>
    );
}
