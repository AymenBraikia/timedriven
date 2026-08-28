// NOTE: no "use server" here. That directive turns every export into a Server
// Action (a POST endpoint), which is wrong for a function called directly from
// a server component — and it blocks caching.

import { unstable_cache } from "next/cache";
import { watches_collection } from "../db/collections";
import type { Watch } from "../types/watch";

// The card grid never reads these, but you're currently shipping them for
// every watch on every request.
const CARD_PROJECTION = {
    _id: 0,
    slug: 1,
    brand: 1,
    brandSlug: 1,
    model: 1,
    reference: 1,
    year: 1,
    price: 1,
    condition: 1,
    movement: 1,
    caseMaterial: 1,
    caseDiameterMm: 1,
    braceletMaterial: 1,
    dialColor: 1,
    waterResistanceM: 1,
    boxPapers: 1,
    inStock: 1,
    date_added: 1,
    relevance_score: 1,
    images: { $slice: 1 },
} as const;

async function query_watches(): Promise<Watch[]> {
    const collection = await watches_collection();
    const data = await collection.find({}, { projection: CARD_PROJECTION }).toArray();

    // Dates and ObjectIds still need flattening for the client boundary,
    // but the payload is now a fraction of the size.
    return JSON.parse(JSON.stringify(data));
}

// Mongo leaves the hot path. One visitor per hour pays for the query;
// everyone else is served from cache.
const get_watches = unstable_cache(query_watches, ["watches:all"], {
    revalidate: 3600,
    tags: ["watches"],
});

export default get_watches;

// Then in your admin write actions, call revalidateTag("watches") so edits
// show up immediately instead of waiting out the hour.
