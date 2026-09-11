"use server";
import { cookies } from "next/headers";
import { visitors_collection } from "../db/collections";

export async function update_visit() {
    if (process.env.NODE_ENV != "production") return;

    const collection = await visitors_collection();

    const cookieStore = await cookies();

    const referer = cookieStore.get("ref")?.value;
    if (!referer) return;

    await collection.updateOne({ referer }, { $set: { saw_pop_up: true } });
}
