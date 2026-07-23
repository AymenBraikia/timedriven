"use server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/app/(auth)/auth/jwt";
import { getAccessToken } from "./paypal";
import { orders_collection, users_collection } from "../db/collections";
import { capture_result, Order } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function capture_order({ orderID }: { orderID: string }): Promise<void | capture_result> {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    let payload;

    if (!token) return;
    else {
        payload = verifyJwt(token);
        if (!payload) return;
    }

    const paypalToken = await getAccessToken();

    const res = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${paypalToken}`,
            "Content-Type": "application/json",
        },
    });

    const data: capture_result = await res.json();

    try {
        if (data.status != "COMPLETED") {
            const order = await orders_collection.findOneAndUpdate({ id: orderID }, { $set: { status: "Failed", capture_id: data.id } });
            if (!order) return;

            await users_collection.findOneAndUpdate(
                { email: order.email },
                {
                    $set: {
                        "recent_activity.$[activity].status": 1,
                    },
                },
                {
                    arrayFilters: [{ "activity.id": orderID }],
                },
            );

            return;
        }
        const order = (await orders_collection.findOne({ id: orderID })) as Order | null;

        if (!order) return;
        if (order.email != payload.email) return;
        if (order.status == "Completed") return;

        await orders_collection.updateOne({ id: orderID }, { $set: { status: "Completed", id: orderID } });


        const user = await users_collection.findOneAndUpdate(
            { email: order.email },
            {
                $pullAll: {
                    cart: order.items,
                },
                $push: {
                    ongoing_orders: order,
                },
            },
            { returnDocument: "after" },
        );

        if (!user) return;

        revalidatePath("/")

        return { ...data, redirect: "/thank_you/" };
    } catch (error) {
        console.log("Caught an error: ", error);
        return;
    }
}
