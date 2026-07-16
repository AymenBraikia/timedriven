"use server";

import { users_collection } from "../db/collections";
import get_item from "./get_item";
import getUser from "./get_user";

export default async function addToCart(reference: string): Promise<boolean> {
    try {
        const user = await getUser();
        if (!user) return false;

        const item = await get_item(reference);
        if (!item) return false;

        const operation = await users_collection.updateOne({ email: user.email }, [
            {
                $set: {
                    cart: {
                        $cond: [
                            { $in: [reference, { $ifNull: ["$cart.reference", []] }] },

                            {
                                $map: {
                                    input: "$cart",
                                    as: "c",
                                    in: {
                                        $cond: [{ $eq: ["$$c.reference", reference] }, { $mergeObjects: ["$$c", { quantity: { $add: ["$$c.quantity", 1] } }] }, "$$c"],
                                    },
                                },
                            },

                            {
                                $concatArrays: [{ $ifNull: ["$cart", []] }, [{ ...item, quantity: 1 }]],
                            },
                        ],
                    },
                },
            },
        ]);

        return operation.acknowledged;
    } catch (error) {
        console.log("an error occured during adding item to cart: ");
        console.error(error);

        return false;
    }
}
