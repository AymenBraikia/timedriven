"use client";

import Image from "next/image";
import { useAuth } from "../context/authContext";
import { ChangeEvent, useEffect, useState } from "react";
import shipping_info from "@/app/shipping.json";
import CheckBox from "@/app/components/elements/checkbox";
import updateUser from "@/app/server/update_user";
import Input from "@/app/components/elements/input";
import PayPal_Btn from "@/app/components/buttons/paypal";

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
            <div className="flex flex-col justify-start items-start w-full h-[50dvh]">
                <div className="flex justify-between items-center font-medium w-full text-xl gap-4 p-2">
                    <p className="w-20">Image</p>
                    <p className="w-100">name</p>
                    <p className="w-30">quantity</p>
                    <p className="w-25">price</p>
                </div>
                <div className="w-full h-full overflow-y-auto overflow-x-hidden p-2">
                    {session.cart.map((i) => (
                        <div key={i.slug} className="flex justify-between items-center gap-4 py-4 border-b h-30 w-full">
                            <div className="relative aspect-square min-h-20 h-full">
                                <Image src={i.images[0]} alt={i.slug} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
                            </div>
                            <p className="text-sm flex justify-start items-center h-full w-100">{i.brand + " " + i.model}</p>
                            <p className="font-medium w-30">{i.quantity}</p>
                            <p className="font-medium w-25">{format(i.price * i.quantity)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-between items-center mt-2 border-b">
                <h5>Subtotal</h5>
                <h5>{format(total)}</h5>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4 border-b tracking-wider">
                <CheckBox label="Local Pickup" action={set_local_pickup} active={local_pickup} />
                <div className={`w-full flex justify-between items-center ${local_pickup ? "line-through brightness-75" : ""}`}>
                    <p>Shipping to {session.address.country}</p>
                    <p>{format(shipping.shipping_cost)}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p>Taxes</p>
                    <p>{format(0)}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p>{payment_method.name} Fee</p>
                    <p>{format(payment_method.fee * total)}</p>
                </div>

                <div className="w-full flex justify-between items-center">
                    <h5>Total</h5>
                    <h5>{format(total + total * payment_method.fee + (local_pickup ? 0 : shipping.shipping_cost))}</h5>
                </div>
            </div>

            <div className="w-full border-b">
                <h2>Payment</h2>
            </div>

            <div className="flex-center flex-col w-full gap-8 font-sans">
                <div className="flex-center w-full">
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.bank_transfer)}
                        className={`w-full button2 transition-default border-b ${payment_method.name == "Bank Transfer" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        Bank Transfer
                    </button>
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.paypal)}
                        className={`w-full button2 transition-default border-b ${payment_method.name == "PayPal" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        PayPal
                    </button>
                    <button
                        type="button"
                        onClick={() => set_payment_method(payments.cards)}
                        className={`w-full button2 transition-default border-b ${payment_method.name == "Credit/Debit Card" ? "bg-secondary border-b-foreground brightness-100" : "brightness-75 border-b-transparent"}`}
                    >
                        Credit/Debit Card
                    </button>
                </div>
                {allowed_payment ? (
                    <div className={`flex justify-start items-center transition-default w-full ${payment_method.name == "PayPal" ? "" : "bg-secondary py-8 px-12"} capitalize gap-2 flex-wrap`}>
                        {payment_method.name == "Bank Transfer" ? (
                            <div className="flex flex-col justify-start items-start gap-4">
                                <p className="tracking-wider leading-6 text-sm">
                                    Make your payment directly into our bank account. Please include the order ID, brand name and model of the item as the payment reference. Additionally, please note that no item will be shipped before the
                                    funds have cleared in our account.
                                </p>

                                {read ? (
                                    <div className="w-full flex justify-center items-start flex-col gap-4 capitalize">
                                        <div className="w-full flex justify-between items-center">
                                            <p>order number:</p>
                                            <p>92212</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>order date:</p>
                                            <p>{new Date().toDateString()}</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>order total:</p>
                                            <p>{format(total + total * payment_method.fee + (local_pickup ? 0 : shipping.shipping_cost))}</p>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>payment method:</p>
                                            <p>{payment_method.name}</p>
                                        </div>
                                        <span className="w-full h-px bg-foreground"></span>
                                        <div className="w-full flex justify-between items-center">
                                            <p>bank:</p>
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
                                        Continue
                                    </button>
                                )}
                            </div>
                        ) : payment_method.name == "PayPal" ? (
                            <div className="w-full">
                                <PayPal_Btn disabled={false} />
                                <p className="text-sm w-full">Note: the watch/spare will be shipped to paypal's address</p>
                            </div>
                        ) : (
                            <>
                                <div className="text-xl! tracking-wider w-full">
                                    <Input label="card number" type="text" max={19} placeholder="1234 1234 1234 1234" onChange={validate_cc} value={card_number} />
                                </div>

                                <div className="text-xl! tracking-wider w-[calc(50%-4px)]">
                                    <Input label="expiration date" type="text" max={19} placeholder="MM/YY" onChange={validate_exp} value={expire} />
                                </div>

                                <div className="text-xl! tracking-wider w-[calc(50%-4px)]">
                                    <Input label="security code" type="text" max={3} placeholder="123" onChange={validate_sec} value={sec_code} />
                                </div>
                                <button type="button" className="button w-full mt-4">
                                    Place Order
                                </button>
                            </>
                        )}
                    </div>
                ) : payment_method.name == "PayPal" ? (
                    <div className="w-full">
                        <PayPal_Btn disabled={false} />
                        <p className="text-sm w-full">Note: the watch/spare will be shipped to paypal's address</p>
                    </div>
                ) : (
                    <h3>Billing details is missing</h3>
                )}
            </div>
        </div>
    );
}

const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
function format(n: number): string {
    return intl.format(n);
}
