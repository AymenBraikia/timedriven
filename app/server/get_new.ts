"use server";

import { watches_collection } from "../db/collections";
import { Watch } from "../types/watch";

const limit = 8;

export default async function get_new(): Promise<Watch[]> {
    const data = await watches_collection
        .find(
            {},
            {
                sort: { _id: -1 },
                limit,
            },
        )
        .toArray();

    return JSON.parse(JSON.stringify(data));
}
