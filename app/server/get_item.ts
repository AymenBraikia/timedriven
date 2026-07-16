"use server";

import { Watch } from "@/types/watch";
import { spares_collection, watches_collection } from "../db/collections";
import type { Spare } from "../types/spare";

export default async function get_item(reference: string): Promise<Spare | Watch> {
    const data = (await watches_collection.findOne({ reference })) || (await spares_collection.findOne({ reference }));

    return JSON.parse(JSON.stringify(data));
}
