"use server";

import { Watch } from "@/types/watch";
import { spares_collection, watches_collection } from "../db/collections";
import type { Spare } from "../types/spare";

const options = { projection: { _id: 0 } };

export default async function get_item(reference: string): Promise<Spare | Watch> {
    const data = (await watches_collection.findOne({ reference }, options)) || (await spares_collection.findOne({ reference }, options));

    return JSON.parse(JSON.stringify(data));
}
