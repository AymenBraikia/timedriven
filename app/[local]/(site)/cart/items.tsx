"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Item_Display from "./item_display";
import shipping_data from "@/app/shipping.json";
import CheckBox from "@/app/components/elements/checkbox";
import Select from "@/app/components/elements/select";
import Link from "next/link";

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

const shipping_options: string[] = Object.keys(shipping_data);

export default function Items() {
    const { session } = useAuth();

    const [total, set_total] = useState<number>(session?.cart.reduce((prev, current) => prev + current.price, 0) || 0);
    const [shipping, set_shipping] = useState<shipping_type>(shipping_data.DE);

    const [pickup, set_pickup] = useState<boolean>(false);
    const [shipping_country, set_country] = useState<string>("DE");

    useEffect(() => {
        set_shipping(shipping_data[shipping_country as keyof typeof shipping_data]);
    }, [shipping_country]);

    return (
        <div className="w-full h-full flex justify-between items-start gap-12">
            {session!.cart.length ? (
                <>
                    <div className="w-4/5 h-fit max-h-100 overflow-y-auto overflow-x-hidden flex justify-start items-start flex-col gap-4 pr-2">
                        {session!.cart.map((i) => (
                            <Item_Display key={i.slug} {...i} />
                        ))}
                    </div>
                    <div className="w-2/5 min-w-100 max-w-125 bg-primary font-secondary flex flex-col justify-start items-start p-4 gap-8">
                        <h1 className="font-semibold">Summary</h1>

                        <div className="flex justify-between items-center w-full border-b py-1">
                            <h4>Subtotal</h4>
                            <h4>{format(total)}</h4>
                        </div>

                        <div className="flex flex-col justify-center items-start w-full border-b gap-4 py-1">
                            <h4 className={`${pickup ? "line-through" : ""}`}>Shipping</h4>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col justify-start items-start gap-2">
                                    <p>Shipping to {shipping.country_name}</p>
                                    <Select options={shipping_options} set_value={set_country} value={shipping_country} label="Choose Shipping Country" />
                                </div>
                                <p className={`${pickup ? "line-through" : ""}`}>{format(shipping.shipping_cost)}</p>
                            </div>

                            <CheckBox label="Local Pickup" active={pickup} action={set_pickup} />

                            <p className="text-sm text-secondary">More about <Link href="/info/payments" className="underline text-foreground">Shipping</Link></p>
                        </div>

                        <div className="flex justify-between items-center w-full border-b py-1">
                            <h2>Total</h2>
                            <h2>{format(total + (pickup ? 0 : shipping.shipping_cost))}</h2>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Your cart is empty</h1>
            )}
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
