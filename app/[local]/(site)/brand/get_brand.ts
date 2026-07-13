"use server";

import { watches_collection } from "@/app/db/collections";
import { Watch } from "@/app/types/watch";

export default async function get_brand(brand: string): Promise<Watch[]> {
    return JSON.parse(JSON.stringify(await watches_collection.find({ brand: brand.toLowerCase().trim() }).toArray()));
}
