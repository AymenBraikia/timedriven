"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Item_Display from "./item_display";
import shipping_data from "@/app/shipping.json";
import CheckBox from "@/app/components/elements/checkbox";
import Select from "@/app/components/elements/select";
import Link from "next/link";
import updateUser from "@/app/server/update_user";
import { format_price } from "../lib/price_format";

const shipping_options: string[] = Object.values(shipping_data).map((c) => c.country_name);

export default function Items() {
    const { session } = useAuth();

    if (!session) return;

    const [total, set_total] = useState<number>(session.cart.reduce((prev, current) => prev + current.price * current.quantity, 0));

    const [pickup, set_pickup] = useState<boolean>(session.local_pickup);

    const [country, set_country] = useState<string>("Germany");
    const [shipping_costs, set_shipping_costs] = useState<number>(shipping_data.DE.shipping_cost);

    useEffect(() => {
        set_total(session.cart.reduce((prev, current) => prev + current.price * current.quantity, 0) || 0);
    }, [session]);
    useEffect(() => {
        set_shipping_costs(Object.values(shipping_data).find((c) => c.country_name == country)!.shipping_cost);
    }, [country]);
    useEffect(() => {
        updateUser({ local_pickup: pickup });
    }, [pickup]);

    return (
        <div className="w-full h-fit flex xl:flex-row flex-col justify-between items-start gap-12 xl:gap-4">
            {session!.cart.length ? (
                <>
                    <div className=" xl:min-w-190 w-full h-full max-h-[75dvh] overflow-y-auto overflow-x-hidden flex justify-start items-start flex-col gap-4 pr-2">
                        {session!.cart.map((i) => (
                            <Item_Display key={i.slug} {...i} />
                        ))}
                    </div>
                    <div className="xl:max-w-125 min-w-100 h-fit w-full bg-background font-secondary flex flex-col justify-start items-start px-4 gap-8">
                        <h1 className="font-semibold">Summary</h1>

                        <div className="flex justify-between items-center w-full border-b py-1">
                            <h4>Subtotal</h4>
                            <h4>{format_price(total)}</h4>
                        </div>

                        <div className="flex flex-col justify-center items-start w-full border-b gap-4 py-1">
                            <h4 className={`${pickup ? "line-through" : ""}`}>Shipping</h4>
                            <div className="flex justify-between items-center w-full gap-4">
                                <div className="flex flex-col justify-start items-start gap-2 text-sm xl:text-base">
                                    <p>Shipping to {country}</p>
                                    <Select options={shipping_options} set_value={set_country} value={country} label="Choose Shipping Country" />
                                </div>
                                <p className={`xl:flex hidden ${pickup ? "line-through" : ""}`}>{format_price(shipping_costs)}</p>
                            </div>

                            <p className={`xl:hidden flex ${pickup ? "line-through" : ""}`}>Shipping Costs: {format_price(shipping_costs)}</p>

                            <CheckBox label="Local Pickup" active={pickup} action={set_pickup} />

                            <p className="text-sm text-secondary">
                                More about{" "}
                                <Link href="/info/payments" className="underline text-foreground">
                                    Shipping
                                </Link>
                            </p>
                        </div>

                        <div className="flex justify-between items-center w-full border-b py-1">
                            <h2>Total</h2>
                            <h2>{format_price(total + (pickup ? 0 : shipping_costs))}</h2>
                        </div>

                        <div className="flex justify-between items-center w-full py-1">
                            <Link href={"/checkout"} className="button w-full flex-center text-xl">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Your cart is empty</h1>
            )}
        </div>
    );
}


