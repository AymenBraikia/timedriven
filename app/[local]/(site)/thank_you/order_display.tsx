"use client";
import { Order } from "@/types/order";
import { useState } from "react";

export default function Order_display({ data, last }: { data: Order; last: boolean }) {
    const [expand, set_expand] = useState<boolean>(false);

    const address = typeof data.address == "string" ? data.address : `${data.address.city}, ${data.address.address1 + (data.address.address2 ? `, ${data.address.address2}` : "")}`;

    const is_few = data.items.length < 3;
    return (
        <div key={data.id} className={`flex justify-between items-start w-full ${last ? "" : "border-b"}  py-4 tracking-wide capitalize gap-10`}>
            <p className="w-full max-w-50">{data.id}</p>
            <div className="w-full min-w-0 flex flex-col justify-start items-start gap-2">
                {is_few ? (
                    data.items.map((e) => <p key={e.slug}>{`${e.quantity}x ${e.brand} ${e.model}`}</p>)
                ) : expand ? (
                    <>
                        {data.items.map((e) => (
                            <p key={e.slug}>{`${e.quantity}x ${e.brand} ${e.model}`}</p>
                        ))}
                        <p className="underline cursor-pointer text-secondary hover:text-foreground transition-default" onClick={() => set_expand(false)}>
                            click to show less
                        </p>
                    </>
                ) : (
                    <>
                        {data.items.map((e, i) => (i > 1 ? null : <p key={e.slug}>{`${e.quantity}x ${e.brand} ${e.model}`}</p>))}
                        <p className="underline cursor-pointer text-secondary hover:text-foreground transition-default" onClick={() => set_expand(true)}>{`+${data.items.length - 2} more items click to expand`}</p>
                    </>
                )}
            </div>
            <p className="w-full max-w-50">{new Date(data.created_at).toDateString()}</p>
            <p className="w-full max-w-40">{format(data.amount_to_pay)}</p>
            <p className="w-full max-w-40">{data.payment_method}</p>
            <p className="w-full">{address}</p>
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
