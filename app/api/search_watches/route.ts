import { unstable_cache } from "next/cache";
import { watches_collection } from "@/app/db/collections";
import { NextRequest, NextResponse } from "next/server";

const SEARCH_PROJECTION = { _id: 0, slug: 1, brand: 1, model: 1, reference: 1, price: 1, images: { $slice: 1 } } as const;

async function query_search(query: string) {
    const data = await (
        await watches_collection()
    )
        .find({ $or: [{ brand: { $regex: query, $options: "i" } }, { model: { $regex: query, $options: "i" } }, { reference: { $regex: query, $options: "i" } }] }, { projection: SEARCH_PROJECTION })
        .limit(10)
        .toArray();
    return JSON.parse(JSON.stringify(data));
}

const search_watches = (query: string) =>
    unstable_cache(query_search, ["watches:search", query], {
        revalidate: 300,
        tags: ["watches"],
    })(query);

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")?.trim().toLowerCase();

    if (!query) return NextResponse.json([]);

    const watches = await search_watches(query);

    return NextResponse.json(watches, {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
}
