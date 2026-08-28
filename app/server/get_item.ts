"use server";

import { Watch } from "@/types/watch";
import { spares_collection, watches_collection } from "../db/collections";
import type { Spare } from "../types/spare";

const options = { projection: { _id: 0 } };

export default async function get_item(slug: string): Promise<Spare | Watch> {
    const data = (await (await watches_collection()).findOne({ slug }, options)) || (await (await spares_collection()).findOne({ slug }, options));

    return JSON.parse(JSON.stringify(data));
}
