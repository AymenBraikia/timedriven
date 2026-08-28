import { watches_collection } from "@/app/db/collections";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) return NextResponse.json([]);

    const watches = await (
        await watches_collection()
    )
        .find({
            $or: [{ brand: { $regex: query, $options: "i" } }, { model: { $regex: query, $options: "i" } }, { reference: { $regex: query, $options: "i" } }],
        })
        .limit(10)
        .toArray();

    return NextResponse.json(watches);
}
