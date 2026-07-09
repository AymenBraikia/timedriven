"use server";

import { watches_collection } from "../db/collections";
import { Watch } from "../types/watch";

export default async function get_watches(): Promise<Watch[]> {
    const data = await watches_collection.find({}).toArray();

    return JSON.parse(JSON.stringify(data));
}
