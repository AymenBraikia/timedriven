import { unstable_cache } from "next/cache";
import { watches_collection } from "../db/collections";
import { Watch } from "../types/watch";

const limit = 8;

async function query_new(): Promise<Watch[]> {
    const data = await (await watches_collection()).find({}, { sort: { _id: -1 }, limit, projection: { _id: 0 } }).toArray();
    return JSON.parse(JSON.stringify(data));
}

const get_new = unstable_cache(query_new, ["watches:new"], {
    revalidate: 3600,
    tags: ["watches"],
});

export default get_new;
