"use server";
import { Supported_Currencies } from "@/currency";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function setCurrency(currency: Supported_Currencies) {
    const cookieStore = await cookies();

    cookieStore.set("Currency", currency);
    revalidatePath("/", "layout");
}
