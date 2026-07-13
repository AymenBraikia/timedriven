"use server";

import { spares_collection } from "../db/collections";
import type { Spare } from "../types/spare";

export default async function get_spare_parts(): Promise<Spare[]> {
    const data = await spares_collection.find({}).toArray();

    return JSON.parse(JSON.stringify(data));
}
