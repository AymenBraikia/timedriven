"use server";

import { watches_collection } from "@/app/db/collections";
import { Watch } from "@/app/types/watch";

export default async function get_product(slug: string): Promise<Watch> {
    return JSON.parse(JSON.stringify(await (await watches_collection()).findOne({ slug: { $regex: slug, $options: "i" } })));
}
